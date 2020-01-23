import PropTypes from 'prop-types'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  UnsupportedChainIdError,
  Web3ReactProvider,
  useWeb3React,
} from '@web3-react/core'
import JSBI from 'jsbi'
import { getConnectors } from './connectors'
import {
  RejectedActivationError,
  UnsupportedChainError,
  UnsupportedConnectorError,
} from './errors'
import {
  getAccountBalance,
  getAccountIsContract,
  getBlockNumber,
  getNetworkName,
  pollEvery,
  rpcResult,
} from './utils'

const NO_BALANCE = '-1'
const POLL_BALANCE_INTERVAL = 1000

const UseWalletContext = React.createContext(null)

function useWallet({ watchBlockNumber } = {}) {
  const walletContext = useContext(UseWalletContext)

  if (walletContext === null) {
    throw new Error(
      'useWallet() can only be used inside of <UseWalletProvider />, please declare it above.'
    )
  }

  // If not specified in the hook params, use the provider setting.
  if (watchBlockNumber === undefined) {
    watchBlockNumber = walletContext.watchBlockNumber
  }

  const blockNumber = useBlockNumberIfWatched(watchBlockNumber)
  const { wallet } = walletContext

  return useMemo(() => ({ ...wallet, blockNumber }), [blockNumber, wallet])
}

function useWalletBalance({ account, ethereum, pollBalanceInterval }) {
  const [balance, setBalance] = useState(NO_BALANCE)

  useEffect(() => {
    if (!account || !ethereum) {
      return
    }

    let cancel = false

    // Poll wallet balance
    const pollBalance = pollEvery((account, ethereum, onUpdate) => {
      let lastBalance = '-1'
      return {
        async request() {
          return getAccountBalance(ethereum, account)
            .then(value => (value ? JSBI.BigInt(value).toString() : NO_BALANCE))
            .catch(() => NO_BALANCE)
        },
        onResult(balance) {
          if (balance !== lastBalance) {
            lastBalance = balance
            onUpdate(balance)
          }
        },
      }
    }, pollBalanceInterval)

    // start polling balance every x time
    const stopPollingBalance = pollBalance(account, ethereum, setBalance)

    return () => {
      cancel = true
      stopPollingBalance()
      setBalance(NO_BALANCE)
    }
  }, [account, ethereum, pollBalanceInterval])

  return balance
}

function useBlockNumberIfWatched(watchBlockNumber) {
  const walletContext = useContext(UseWalletContext)
  const [blockNumber, setBlockNumber] = useState(null)

  useEffect(() => {
    if (!watchBlockNumber) {
      return
    }
    walletContext.addBlockNumberListener(setBlockNumber)
    return () => {
      walletContext.removeBlockNumberListener(setBlockNumber)
    }
  }, [watchBlockNumber, walletContext])

  return blockNumber
}

// Only watch block numbers, and return functions allowing to subscribe to it.
function useWatchBlockNumber({ ethereum, pollBlockNumberInterval }) {
  // Using listeners lets useWallet() decide if it wants to expose the block
  // number, which implies to re-render whenever the block number updates.
  const blockNumberListeners = useRef(new Set())
  const addBlockNumberListener = useCallback(cb => {
    blockNumberListeners.current.add(cb)
  }, [])
  const removeBlockNumberListener = useCallback(cb => {
    blockNumberListeners.current.delete(cb)
  }, [])

  useEffect(() => {
    if (!ethereum) {
      return
    }

    let cancel = false

    const pollBlockNumber = pollEvery(() => {
      return {
        request: () => getBlockNumber(ethereum),
        onResult: latestBlockNumber => {
          if (cancel) {
            return
          }
          const blockNumber = JSBI.BigInt(latestBlockNumber).toString()
          for (const cb of blockNumberListeners.current.values()) {
            cb(blockNumber)
          }
        },
      }
    }, pollBlockNumberInterval)

    const stopPollingBlockNumber = pollBlockNumber()

    return () => {
      cancel = true
      stopPollingBlockNumber()
    }
  }, [ethereum, pollBlockNumberInterval])

  return { addBlockNumberListener, removeBlockNumberListener }
}

function UseWalletProvider({
  chainId,
  children,
  // connectors contains init functions and/or connector configs.
  connectors: connectorsInitsOrConfigs,
  pollBalanceInterval,
  pollBlockNumberInterval,
  watchBlockNumber,
}) {
  const walletContext = useContext(UseWalletContext)

  if (walletContext !== null) {
    throw new Error('<UseWalletProvider /> has already been declared.')
  }

  const [isContract, setIsContract] = useState(false)
  const [connected, setConnected] = useState(false)
  const web3ReactContext = useWeb3React()
  const activationId = useRef(0)
  const { account, library: ethereum } = web3ReactContext

  const balance = useWalletBalance({ account, ethereum, pollBalanceInterval })
  const {
    addBlockNumberListener,
    removeBlockNumberListener,
  } = useWatchBlockNumber({ ethereum, pollBlockNumberInterval })

  // Combine the user-provided connectors with the default ones (see connectors.js).
  const connectors = useMemo(
    () => getConnectors(chainId, connectorsInitsOrConfigs),
    [chainId, connectorsInitsOrConfigs]
  )

  const activate = useCallback(
    async (connectorId = 'injected') => {
      // Prevent race conditions between connections by using an external ID.
      const id = ++activationId.current

      if (web3ReactContext.active) {
        await web3ReactContext.deactivate()
      }

      // Check if another connection has happened right after deactivate().
      if (id !== activationId.current) {
        return
      }

      if (!connectors[connectorId]) {
        throw new UnsupportedConnectorError(connectorId)
      }

      const connector = connectors[connectorId]

      const web3ReactConnector =
        connector &&
        connector.web3ReactConnector &&
        connector.web3ReactConnector({ chainId, ...(connector.config || {}) })

      if (!web3ReactConnector) {
        throw new UnsupportedConnectorError(connectorId)
      }

      try {
        // TODO: there is no way to cancel an activation to complete, but we
        // could reconnect to the last provider the user tried to connect to.
        await web3ReactContext.activate(web3ReactConnector, null, true)
      } catch (err) {
        // Don’t throw if another connection has happened in the meantime.
        if (id !== activationId.current) {
          return
        }
        if (err instanceof UnsupportedChainIdError) {
          throw new UnsupportedChainError(-1, chainId)
        }
        // It might have thrown with an error known by the connector
        if (connector.handleActivationError) {
          connector.handleActivationError(err)
        }
        // Otherwise, throw the received error
        throw err
      }
    },
    [chainId, connectors, web3ReactContext]
  )

  useEffect(() => {
    if (!account || !ethereum) {
      return
    }

    let cancel = false

    setConnected(true)
    setIsContract(false)

    getAccountIsContract(ethereum, account).then(isContract => {
      if (!cancel) {
        setIsContract(isContract)
      }
    })

    return () => {
      cancel = true
      setConnected(false)
      setIsContract(false)
    }
  }, [account, ethereum])

  const wallet = useMemo(
    () => ({
      _web3ReactContext: web3ReactContext,
      account: account || null,
      activate,
      balance,
      chainId,
      connected,
      connectors,
      deactivate: web3ReactContext.deactivate,
      ethereum,
      networkName: getNetworkName(chainId),
    }),
    [
      account,
      activate,
      balance,
      chainId,
      connected,
      connectors,
      ethereum,
      web3ReactContext,
    ]
  )

  return (
    <Web3ReactProvider getLibrary={ethereum => ethereum}>
      <UseWalletContext.Provider
        value={{
          addBlockNumberListener,
          pollBalanceInterval,
          pollBlockNumberInterval,
          removeBlockNumberListener,
          wallet,
          watchBlockNumber,
        }}
      >
        {children}
      </UseWalletContext.Provider>
    </Web3ReactProvider>
  )
}

UseWalletProvider.propTypes = {
  chainId: PropTypes.number,
  children: PropTypes.node,
  connectors: PropTypes.objectOf(PropTypes.object),
  pollBalanceInterval: PropTypes.number,
  pollBlockNumberInterval: PropTypes.number,
  watchBlockNumber: PropTypes.bool,
}

UseWalletProvider.defaultProps = {
  chainId: 1,
  connectors: {},
  pollBalanceInterval: 2000,
  pollBlockNumberInterval: 5000,
  watchBlockNumber: true,
}

function UseWalletProviderWrapper(props) {
  return (
    <Web3ReactProvider getLibrary={ethereum => ethereum}>
      <UseWalletProvider {...props} />
    </Web3ReactProvider>
  )
}

UseWalletProviderWrapper.propTypes = UseWalletProvider.propTypes
UseWalletProviderWrapper.defaultProps = UseWalletProvider.defaultProps

export {
  RejectedActivationError,
  UnsupportedChainError,
  UnsupportedConnectorError,
  UseWalletProviderWrapper as UseWalletProvider,
  useWallet,
}

export default useWallet
