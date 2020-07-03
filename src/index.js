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
} from './utils'

const NO_BALANCE = '-1'

const UseWalletContext = React.createContext(null)

function useWallet() {
  const walletContext = useContext(UseWalletContext)

  if (walletContext === null) {
    throw new Error(
      'useWallet() can only be used inside of <UseWalletProvider />, ' +
        'please declare it at a higher level.'
    )
  }

  const getBlockNumber = useGetBlockNumber()
  const { wallet } = walletContext

  return useMemo(() => ({ ...wallet, getBlockNumber }), [
    getBlockNumber,
    wallet,
  ])
}

function useGetBlockNumber() {
  const walletContext = useContext(UseWalletContext)
  const [blockNumber, setBlockNumber] = useState(null)
  const requestedBlockNumber = useRef(false)

  const getBlockNumber = useCallback(() => {
    requestedBlockNumber.current = true
    walletContext.addBlockNumberListener(setBlockNumber)
    return blockNumber
  }, [walletContext, blockNumber])

  useEffect(() => {
    if (!requestedBlockNumber.current) {
      return
    }

    walletContext.addBlockNumberListener(setBlockNumber)
    return () => {
      walletContext.removeBlockNumberListener(setBlockNumber)
    }
  }, [requestedBlockNumber, walletContext])

  return getBlockNumber
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
          if (!cancel && balance !== lastBalance) {
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

// Only watch block numbers, and return functions allowing to subscribe to it.
function useWatchBlockNumber({ ethereum, pollBlockNumberInterval }) {
  const lastBlockNumber = useRef(null)

  // Using listeners lets useWallet() decide if it wants to expose the block
  // number, which implies to re-render whenever the block number updates.
  const blockNumberListeners = useRef(new Set())

  const addBlockNumberListener = useCallback(cb => {
    if (blockNumberListeners.current.has(cb)) {
      return
    }

    // Immediately send the block number to the new listener
    cb(lastBlockNumber.current)

    // Add the listener
    blockNumberListeners.current.add(cb)
  }, [])

  const removeBlockNumberListener = useCallback(cb => {
    blockNumberListeners.current.delete(cb)
  }, [])

  // Update the block number and broadcast it to the listeners
  const updateBlockNumber = useCallback(blockNumber => {
    if (lastBlockNumber.current === blockNumber) {
      return
    }

    lastBlockNumber.current = blockNumber
    blockNumberListeners.current.forEach(cb => cb(blockNumber))
  }, [])

  useEffect(() => {
    if (!ethereum) {
      updateBlockNumber(null)
      return
    }

    let cancel = false

    const pollBlockNumber = pollEvery(() => {
      return {
        request: () => getBlockNumber(ethereum),
        onResult: latestBlockNumber => {
          if (!cancel) {
            updateBlockNumber(
              latestBlockNumber === null
                ? null
                : JSBI.BigInt(latestBlockNumber).toString()
            )
          }
        },
      }
    }, pollBlockNumberInterval)

    const stopPollingBlockNumber = pollBlockNumber()

    return () => {
      cancel = true
      stopPollingBlockNumber()
    }
  }, [ethereum, pollBlockNumberInterval, updateBlockNumber])

  return { addBlockNumberListener, removeBlockNumberListener }
}

function UseWalletProvider({
  chainId,
  children,
  // connectors contains init functions and/or connector configs.
  connectors: connectorsInitsOrConfigs,
  pollBalanceInterval,
  pollBlockNumberInterval,
}) {
  const walletContext = useContext(UseWalletContext)

  if (walletContext !== null) {
    throw new Error('<UseWalletProvider /> has already been declared.')
  }

  const [activating, setActivating] = useState(null)
  const [activated, setActivated] = useState(null)
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

  const deactivate = useCallback(async () => {
    if (web3ReactContext.active) {
      await web3ReactContext.deactivate()
    }
    setActivating(null)
    setActivated(null)
  }, [web3ReactContext])

  const activate = useCallback(
    async (connectorId = 'injected') => {
      // Prevent race conditions between connections by using an external ID.
      const id = ++activationId.current

      deactivate()

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
        connector.web3ReactConnector({
          chainId,
          ...(connector.config || {}),
        })

      if (!web3ReactConnector) {
        throw new UnsupportedConnectorError(connectorId)
      }

      try {
        // TODO: there is no way to prevent an activation to complete, but we
        // could reconnect to the last provider the user tried to connect to.
        setActivating(connectorId)
        await web3ReactContext.activate(web3ReactConnector, null, true)
        setActivated(connectorId)
        setActivating(null)
      } catch (err) {
        setActivating(null)

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
    [chainId, connectors, deactivate, web3ReactContext]
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
      activated,
      activating,
      balance,
      chainId,
      connected,
      connectors,
      deactivate,
      ethereum,
      isContract,
      networkName: getNetworkName(chainId),
    }),
    [
      account,
      activate,
      activated,
      activating,
      balance,
      chainId,
      connected,
      connectors,
      deactivate,
      ethereum,
      isContract,
      web3ReactContext,
    ]
  )

  return (
    <UseWalletContext.Provider
      value={{
        addBlockNumberListener,
        pollBalanceInterval,
        pollBlockNumberInterval,
        removeBlockNumberListener,
        wallet,
      }}
    >
      {children}
    </UseWalletContext.Provider>
  )
}

UseWalletProvider.propTypes = {
  chainId: PropTypes.number,
  children: PropTypes.node,
  connectors: PropTypes.objectOf(PropTypes.object),
  pollBalanceInterval: PropTypes.number,
  pollBlockNumberInterval: PropTypes.number,
}

UseWalletProvider.defaultProps = {
  chainId: 1,
  connectors: {},
  pollBalanceInterval: 2000,
  pollBlockNumberInterval: 5000,
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
