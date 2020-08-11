import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { Connector } from '../types'
import { ConnectorConfigError } from '../errors'

export default class ConnectorFortmatic implements Connector {
  web3ReactConnector({ chainId, apiKey }: { chainId: number; apiKey: string }) {
    if (!apiKey) {
      throw new ConnectorConfigError(
        'The Fortmatic connector requires apiKey to be set.'
      )
    }
    return new FortmaticConnector({ apiKey, chainId })
  }
}
