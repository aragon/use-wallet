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
import { pollEvery, getNetworkName } from './utils'

const NO_BALANCE = '-1'
const POLL_BALANCE_INTERVAL = 1000

const WalletPlugContext = React.createContext()

const pollBalance = pollEvery((account, ethereum, onUpdate) => {
  let lastBalance = '-1'
  return {
    async request() {
      return ethereum
        .send('eth_getBalance', [account, 'latest'])
        .then(value => {
          if (!value || !value.result || value.error) {
            return NO_BALANCE
          }
          return JSBI.BigInt(value.result).toString()
        })
        .catch(() => NO_BALANCE)
    },
    onResult(balance) {
      if (balance !== lastBalance) {
        lastBalance = balance
        onUpdate(balance)
      }
    },
  }
}, POLL_BALANCE_INTERVAL)

function useWallet() {
  const [balance, setBalance] = useState(NO_BALANCE)
  const [connected, setConnected] = useState(false)
  const web3ReactContext = useWeb3React()
  const { chainId, connectors } = useContext(WalletPlugContext)
  const activationId = useRef(0)
  const { account, library: ethereum } = web3ReactContext

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

    setConnected(true)

    // start polling balance every x time
    const stop = pollBalance(account, ethereum, setBalance)

    return () => {
      stop()
      setBalance(NO_BALANCE)
      setConnected(false)
    }
  }, [account, ethereum])

  return useMemo(
    () => ({
      _web3ReactContext: web3ReactContext,
      account: account || null,
      activate,
      balance,
      connected,
      connectors,
      deactivate: web3ReactContext.deactivate,
      networkName: getNetworkName(chainId),
    }),
    [
      account,
      activate,
      balance,
      chainId,
      connected,
      connectors,
      web3ReactContext,
    ]
  )
}

function UseWalletProvider({
  chainId,
  children,

  // connectors contains init functions and/or connector configs.
  connectors: connectorsInitsOrConfigs,
}) {
  // Combine the user-provided connectors with the default ones (see connectors.js).
  const connectors = useMemo(
    () => getConnectors(chainId, connectorsInitsOrConfigs),
    [chainId, connectorsInitsOrConfigs]
  )

  return (
    <Web3ReactProvider getLibrary={ethereum => ethereum}>
      <WalletPlugContext.Provider value={{ chainId, connectors }}>
        {children}
      </WalletPlugContext.Provider>
    </Web3ReactProvider>
  )
}

UseWalletProvider.propTypes = {
  chainId: PropTypes.number,
  children: PropTypes.node,
  connectors: PropTypes.objectOf(PropTypes.object),
}

UseWalletProvider.defaultProps = {
  chainId: 1,
  connectors: {},
}

export {
  RejectedActivationError,
  UnsupportedChainError,
  UnsupportedConnectorError,
  UseWalletProvider,
  useWallet,
}

export default useWallet
