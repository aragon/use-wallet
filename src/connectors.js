import { AuthereumConnector } from '@web3-react/authereum-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import {
  FrameConnector,
  UserRejectedRequestError as FrameUserRejectedRequestError,
} from '@web3-react/frame-connector'
import {
  InjectedConnector,
  // NoEthereumProviderError as InjectedNoEthereumProviderError,
  UserRejectedRequestError as InjectedUserRejectedRequestError,
} from '@web3-react/injected-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { SquarelinkConnector } from '@web3-react/squarelink-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { RejectedActivationError, ConnectorConfigError } from './errors'

// TODO: fix syntax error issue with the walletconnect-connector module.
// import {
//   UserRejectedRequestError as WalletConnectUserRejectedRequestError,
//   WalletConnectConnector,
// } from '@web3-react/walletconnect-connector'

// TODO: fix babel-runtime issue with torus-connector
import { TorusConnector } from '@web3-react/torus-connector'

export function getConnectors(chainId, connectorsInitsOrConfigs = {}) {
  // Split the connector initializers from the confs.
  const [inits, configs] = Object.entries(connectorsInitsOrConfigs).reduce(
    ([inits, configs], [id, initOrConfig]) => {
      // Having a web3ReactConnector function is
      // the only prerequisite for an initializer.
      if (typeof initOrConfig.web3ReactConnector === 'function') {
        return [{ ...inits, [id]: initOrConfig }, configs]
      }
      return [inits, [...configs, [id, initOrConfig]]]
    },
    [{}, []]
  )

  const connectors = {
    injected: {
      web3ReactConnector({ chainId }) {
        return new InjectedConnector({ supportedChainIds: [chainId] })
      },
      handleActivationError(err) {
        if (err instanceof InjectedUserRejectedRequestError) {
          throw new RejectedActivationError()
        }
      },
    },
    frame: {
      web3ReactConnector({ chainId }) {
        return new FrameConnector({ supportedChainIds: [chainId] })
      },
      handleActivationError(err) {
        if (err instanceof FrameUserRejectedRequestError) {
          throw new RejectedActivationError()
        }
        if (err.message.startsWith('JSON.parse')) {
          throw new Error(
            'There seem to be an issue when trying to connect to Frame.'
          )
        }
      },
    },
    fortmatic: {
      web3ReactConnector({ chainId, apiKey }) {
        if (!apiKey) {
          throw new ConnectorConfigError(
            'The Fortmatic connector requires apiKey to be set.'
          )
        }
        return new FortmaticConnector({ apiKey, chainId })
      },
    },
    portis: {
      web3ReactConnector({ chainId, dAppId }) {
        if (!dAppId) {
          throw new ConnectorConfigError(
            'The Portis connector requires dAppId to be set.'
          )
        }
        return new PortisConnector({ dAppId, networks: [chainId] })
      },
    },
    authereum: {
      web3ReactConnector({ chainId }) {
        return new AuthereumConnector({ chainId })
      },
    },
    squarelink: {
      web3ReactConnector({ chainId, clientId, options }) {
        return new SquarelinkConnector({
          clientId,
          networks: [chainId],
          options,
        })
      },
    },
    torus: {
      web3ReactConnector({ chainId, initOptions, constructorOptions }) {
        return new TorusConnector({
          chainId,
          constructorOptions,
          initOptions,
        })
      },
    },
    // walletconnect: {
    //   web3ReactConnector({ chainId, rpcUrl, bridge, pollingInterval }) {
    //     if (!rpcUrl) {
    //       throw new ConnectorConfigError(
    //         'The WalletConnect connector requires rpcUrl to be set.'
    //       )
    //     }
    //     return new WalletConnectConnector({
    //       bridge,
    //       pollingInterval,
    //       qrcode,
    //       rpc: { [chainId]: rpcUrl },
    //     })
    //   },
    //   handleActivationError(err) {
    //     if (err instanceof WalletConnectUserRejectedRequestError) {
    //       throw new RejectedActivationError()
    //     }
    //   },
    // },
    walletlink: {
      web3ReactConnector({ chainId, url, appName, appLogoUrl }) {
        if (chainId !== 1) {
          throw new ConnectorConfigError(
            'The WalletLink connector requires chainId to be 1.'
          )
        }
        return new WalletLinkConnector({ url, appName, appLogoUrl })
      },
    },
    ...inits,
  }

  // Attach the configs to their connectors.
  for (const [id, config] of configs) {
    if (connectors[id]) {
      connectors[id].config = config
    }
  }

  return connectors
}
