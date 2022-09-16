import { ConnectorConfig, Connector } from '../types'
import { ConnectorConfigError } from '../errors'
import initInjected from './ConnectorInjected'
import initWalletConnect from './ConnectorWalletConnect'

export default async function init(): Promise<Connector> {
  const { UAuthConnector } = await import('@uauth/web3-react')

  const injectedConnector = await initInjected()
  const walletconnectConnector = await initWalletConnect()

  return {
    web3ReactConnector({
      clientID,
      redirectUri,
      postLogoutRedirectUri,
      scope,
      injectedConnectorConfig,
      walletconnectConnectorConfig,
      shouldLoginWithRedirect,
      supportedChainIds,
    }: {
      clientID: string
      redirectUri: string
      postLogoutRedirectUri: string
      scope: string
      injectedConnectorConfig: ConnectorConfig
      walletconnectConnectorConfig: ConnectorConfig
      shouldLoginWithRedirect?: boolean
      supportedChainIds?: number[]
    }) {
      if (!clientID) {
        throw new ConnectorConfigError(
          'The UAuth connector requires clientID to be set.'
        )
      }

      if (shouldLoginWithRedirect) {
        if (!redirectUri) {
          throw new ConnectorConfigError(
            'The UAuth connector configuration requires redirectUri to be set.'
          )
        }

        if (!postLogoutRedirectUri) {
          throw new ConnectorConfigError(
            'The UAuth connector configuration requires postLogoutRedirectUri to be set.'
          )
        }
      }

      // Initialize the web3-react connector if it exists.
      const web3ReactInjectedConnector =
        injectedConnector?.web3ReactConnector?.({
          ...(injectedConnectorConfig || {}),
        })

      if (!web3ReactInjectedConnector) {
        throw new ConnectorConfigError(
          'The UAuth connector requires Injected connector.'
        )
      }

      const web3ReactWalletConnectConnector =
        walletconnectConnector?.web3ReactConnector?.({
          ...(walletconnectConnectorConfig || {}),
        })

      if (!web3ReactInjectedConnector) {
        throw new ConnectorConfigError(
          'The UAuth connector requires WalletConnect connector.'
        )
      }

      return new UAuthConnector({
        clientID,

        redirectUri,
        postLogoutRedirectUri,

        scope,

        // Injected and WalletConnect connectors are required.
        connectors: {
          injected: web3ReactInjectedConnector,
          walletconnect: web3ReactWalletConnectConnector,
        },

        shouldLoginWithRedirect,

        supportedChainIds,
      })
    },
  }
}
