import { Connector } from '../types'
import { ConnectorConfigError } from '../errors'

const POLLING_INTERVAL = 12000
const LEDGER_LIVE_PATH = "m/44'/60'/0'/0"

export default async function init(): Promise<Connector> {
  const { LedgerConnector } = await import('@web3-react/ledger-connector')
  return {
    web3ReactConnector({ chainId, url }: { chainId: number; url: string }) {
      if (!url) {
        throw new ConnectorConfigError(
          'The Ledger connector requires url to be set.'
        )
      }
      return new LedgerConnector({
        url,
        chainId,
        pollingInterval: POLLING_INTERVAL,
        baseDerivationPath: LEDGER_LIVE_PATH,
      })
    },
  }
}
