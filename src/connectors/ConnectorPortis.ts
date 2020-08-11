import { PortisConnector } from '@web3-react/portis-connector'
import { Connector } from '../types'
import { ConnectorConfigError } from '../errors'

export default class ConnectorPortis implements Connector {
  web3ReactConnector({ chainId, dAppId }: { chainId: number; dAppId: string }) {
    if (!dAppId) {
      throw new ConnectorConfigError(
        'The Portis connector requires dAppId to be set.'
      )
    }
    return new PortisConnector({ dAppId, networks: [chainId] })
  }
}
