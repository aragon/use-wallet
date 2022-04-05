import type { ReactNode } from 'react'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import {
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

import {
  AccountType,
  Connector,
  ConnectorConfig,
  Status,
  Wallet,
} from './types'
import { getConnectors } from './connectors'
import {
  ConnectionRejectedError,
  ChainUnsupportedError,
  ConnectorUnsupportedError,
} from './errors'
import {
  getAccountIsContract,
  blockExplorerUrl,
  getLastActiveAccount,
  clearLastActiveAccount,
  setLastActiveAccount,
  setLastConnector,
  getLastConnector,
} from './utils'

import {
  getProviderFromUseWalletId,
  getProviderString,
} from './providers/index'
import * as chains from './chains'
import { useWatchBlockNumber } from './hooks/watchBlockNumber'
import { useWalletBalance } from './hooks/walletBalance'

type WalletContext = {
  addBlockNumberListener: (callback: (blockNumber: number) => void) => void
  pollBalanceInterval: number
  pollBlockNumberInterval: number
  removeBlockNumberListener: (callback: (blockNumber: number) => void) => void
  wallet: Wallet
} | null

const UseWalletContext = React.createContext<WalletContext>(null)

// CONTEXT CONSUMER ============================================================

function useWallet(): Wallet {
  const walletContext = useContext(UseWalletContext)

  if (walletContext === null) {
    throw new Error(
      'useWallet() can only be used inside of <UseWalletProvider />, ' +
        'please declare it at a higher level.'
    )
  }

  const getBlockNumber = useGetBlockNumber()
  const { wallet } = walletContext

  return useMemo(() => {
    return { ...wallet, getBlockNumber }
  }, [getBlockNumber, wallet])
}

function useGetBlockNumber(): () => number | null {
  const walletContext = useContext(UseWalletContext)
  const [blockNumber, setBlockNumber] = useState<number | null>(null)
  const requestedBlockNumber = useRef<boolean>(false)

  const getBlockNumber = useCallback<() => number | null>(() => {
    if (walletContext === null) {
      return null
    }

    requestedBlockNumber.current = true
    walletContext.addBlockNumberListener(setBlockNumber)

    return blockNumber
  }, [walletContext, blockNumber])

  useEffect(() => {
    if (!requestedBlockNumber.current || walletContext === null) {
      return
    }

    walletContext.addBlockNumberListener(setBlockNumber)
    return () => {
      walletContext.removeBlockNumberListener(setBlockNumber)
    }
  }, [requestedBlockNumber, walletContext])

  return getBlockNumber
}

// CONTEXT PROVIDER ============================================================

type UseWalletProviderProps = {
  children: ReactNode
  connectors: { [key: string]: Connector | ConnectorConfig }
  autoConnect: boolean
  pollBalanceInterval: number
  pollBlockNumberInterval: number
}

UseWalletProvider.propTypes = {
  children: PropTypes.node,
  connectors: PropTypes.objectOf(PropTypes.object),
  autoConnect: PropTypes.bool,
  pollBalanceInterval: PropTypes.number,
  pollBlockNumberInterval: PropTypes.number,
}

UseWalletProvider.defaultProps = {
  connectors: {},
  autoConnect: false,
  pollBalanceInterval: 2000,
  pollBlockNumberInterval: 5000,
}

function UseWalletProvider({
  children,
  // connectors contains init functions and/or connector configs.
  connectors: connectorsInitsOrConfigs,
  autoConnect,
  pollBalanceInterval,
  pollBlockNumberInterval,
}: UseWalletProviderProps) {
  const walletContext = useContext(UseWalletContext)

  if (walletContext !== null) {
    throw new Error('<UseWalletProvider /> has already been declared.')
  }

  const [connector, setConnector] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [type, setType] = useState<AccountType | null>(null)
  const [status, setStatus] = useState<Status>('disconnected')
  const web3ReactContext = useWeb3React()
  const activationId = useRef<number>(0)
  const {
    account,
    chainId: web3ChainId,
    library: ethereum,
    error: web3Error,
  } = web3ReactContext
  const balance = useWalletBalance({ account, ethereum, pollBalanceInterval })
  const { addBlockNumberListener, removeBlockNumberListener } =
    useWatchBlockNumber({ ethereum, pollBlockNumberInterval })

  // Combine the user-provided connectors with the default ones (see connectors.js).
  const connectors = useMemo(
    () => getConnectors(connectorsInitsOrConfigs),
    [connectorsInitsOrConfigs]
  )

  const chainId = useMemo(
    () => (web3ChainId ? web3ChainId : chains.getDefaultChainId()),
    [web3ChainId]
  )

  const reset = useCallback(() => {
    if (web3ReactContext.active) {
      web3ReactContext.deactivate()
    }
    clearLastActiveAccount()
    setConnector(null)
    setError(null)
    setStatus('disconnected')
  }, [web3ReactContext])

  // if the user switched networks on the wallet itself
  // return unsupported error.
  useMemo(() => {
    if (web3Error instanceof UnsupportedChainIdError) {
      setStatus('error')
      setError(new ChainUnsupportedError(web3Error.message))
    }
  }, [web3Error])

  const connect = useCallback(
    async (connectorId = 'injected') => {
      // Prevent race conditions between connections by using an external ID.
      const id = ++activationId.current

      reset()

      // Check if another connection has happened right after deactivate().
      if (id !== activationId.current) {
        return
      }

      if (!connectors[connectorId]) {
        setStatus('error')
        setError(new ConnectorUnsupportedError(connectorId))
        return
      }

      // If no connection happens, we're in the right context and can safely update
      // the connection stage status
      setStatus('connecting')

      const [connectorInit, connectorConfig] = connectors[connectorId] || []

      // Initialize the (useWallet) connector if it exists.
      const connector = await connectorInit?.()

      // Initialize the web3-react connector if it exists.
      const web3ReactConnector = connector?.web3ReactConnector?.({
        ...(connectorConfig || {}),
      })

      if (!web3ReactConnector) {
        setStatus('error')
        setError(new ConnectorUnsupportedError(connectorId))
        return
      }

      try {
        // TODO: there is no way to prevent an activation to complete, but we
        // could reconnect to the last provider the user tried to connect to.
        setConnector(connectorId)
        await web3ReactContext.activate(web3ReactConnector, undefined, true)
        setLastConnector(connectorId)
        if (connectorId === 'injected') {
          const account = await web3ReactConnector.getAccount()
          account && setLastActiveAccount(account)
          web3ReactConnector.getProvider().then((provider) => {
            provider.on('accountsChanged', (accounts: string[]) => {
              setLastActiveAccount(accounts[0])
            })
          })
        }
        setStatus('connected')
      } catch (err) {
        // Don’t throw if another connection has happened in the meantime.
        if (id !== activationId.current) {
          return
        }

        // If not, the error has been thrown during the current connection attempt,
        // so it's correct to indicate that there has been an error
        setConnector(null)
        setStatus('error')

        if (err instanceof UnsupportedChainIdError) {
          setError(new ChainUnsupportedError(err.message))
          return
        }
        // It might have thrown with an error known by the connector
        if (connector.handleActivationError) {
          const handledError = connector.handleActivationError(err as Error)
          if (handledError) {
            setError(handledError)
            return
          }
        }
        // Otherwise, set to state the received error
        setError(err as Error)
      }
    },
    [connectors, reset, web3ReactContext]
  )

  useEffect(() => {
    if (!autoConnect) {
      return
    }

    const lastConnector = getLastConnector()
    const lastActiveAccount = getLastActiveAccount()

    if (lastActiveAccount && lastConnector === 'injected') {
      const isInjectedAvailable = Object.keys(connectors).some(
        (key) => key === 'injected'
      )

      if (isInjectedAvailable) {
        connect()
      }
    }

    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!account || !ethereum) {
      return
    }

    let cancel = false

    setType(null)

    getAccountIsContract(ethereum, account).then((isContract) => {
      if (!cancel) {
        setStatus('connected')
        setType(isContract ? 'contract' : 'normal')
      }
    })

    return () => {
      cancel = true
      setStatus('disconnected')
      setType(null)
    }
  }, [account, ethereum])

  const wallet = useMemo(
    () => ({
      _web3ReactContext: web3ReactContext,
      account: account || null,
      balance,
      chainId,
      connect,
      connector,
      connectors,
      error,
      ethereum,
      isConnected: () => status === 'connected',
      networkName: chains.getChainInformation(chainId).type,
      providerInfo: connector
        ? getProviderFromUseWalletId(connector)
        : getProviderFromUseWalletId('unknown'),
      reset,
      status,
      type,
    }),
    [
      account,
      balance,
      chainId,
      connect,
      connector,
      connectors,
      error,
      ethereum,
      type,
      reset,
      status,
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

UseWalletProviderWrapper.propTypes = UseWalletProvider.propTypes
UseWalletProviderWrapper.defaultProps = UseWalletProvider.defaultProps

function UseWalletProviderWrapper(props: UseWalletProviderProps) {
  return (
    <Web3ReactProvider getLibrary={(ethereum) => ethereum}>
      <UseWalletProvider {...props} />
    </Web3ReactProvider>
  )
}

export {
  ConnectionRejectedError,
  ChainUnsupportedError,
  ConnectorUnsupportedError,
  UseWalletProviderWrapper as UseWalletProvider,
  useWallet,
  getProviderString,
  getProviderFromUseWalletId,
  blockExplorerUrl,
  getLastActiveAccount,
  chains,
}
