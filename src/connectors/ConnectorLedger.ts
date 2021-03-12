import { ConnectorConfigError } from '../errors'
import { Connector } from '../types'

export default async function init(): Promise<Connector> {
  const { LedgerConnector } = await import('@web3-react/ledger-connector')
  return {
    web3ReactConnector({
      chainId,
      url,
    }: {
      chainId: number
      url: string
    }) {
      if (chainId !== 1) {
        throw new ConnectorConfigError(
          'The Ledger connector requires chainId to be 1.'
        )
      }
      if (!/^https?:\/\//.test(url)) {
        throw new ConnectorConfigError(
          'The Ledger connector requires url to be an HTTP URL.'
        )
      }
      return new LedgerConnector({ chainId, url })
    },
  }
}
