import { AbstractConnector } from '@web3-react/abstract-connector'
import { Connector } from '../types'
import { ConnectorConfigError } from '../errors'

export default async function init(): Promise<Connector> {
  const { UAuthConnector } = await import('@uauth/web3-react')
  return {
    web3ReactConnector({
      clientID,
      redirectUri,
      postLogoutRedirectUri,
      scope,
      injectedConnector,
      walletconnectConnector,
      shouldLoginWithRedirect,
      supportedChainIds
    }: {
      clientID: string
      redirectUri: string
      postLogoutRedirectUri: string
      scope: string
      injectedConnector: AbstractConnector
      walletconnectConnector: AbstractConnector
      shouldLoginWithRedirect?: boolean,
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

      return new UAuthConnector({
        clientID,

        redirectUri,
        postLogoutRedirectUri,

        scope,

        // Injected and walletconnect connectors are required.
        connectors: {
          injected: injectedConnector,
          walletconnect: walletconnectConnector,
        },

        shouldLoginWithRedirect,
        
        supportedChainIds
      })
    },
  }
}
