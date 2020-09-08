import 'regenerator-runtime/runtime.js'
import { Connector } from '../types'
import { ConnectorConfigError } from '../errors'

export default async function init(): Promise<Connector> {
  const { WalletLinkConnector } = await import(
    '@web3-react/walletlink-connector'
  )
  return {
    web3ReactConnector({
      chainId,
      url,
      appName,
      appLogoUrl,
    }: {
      chainId: number
      url: string
      appName: string
      appLogoUrl: string
    }) {
      if (chainId !== 1) {
        throw new ConnectorConfigError(
          'The WalletLink connector requires chainId to be 1.'
        )
      }
      if (!/^https?:\/\//.test(url)) {
        throw new ConnectorConfigError(
          'The WalletLink connector requires url to be an HTTP URL.'
        )
      }
      return new WalletLinkConnector({ url, appName, appLogoUrl })
    },
  }
}
