import 'regenerator-runtime/runtime.js'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { Connector } from '../types'
import { ConnectorConfigError } from '../errors'

export default class ConnectorWalletLink implements Connector {
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
  }
}
