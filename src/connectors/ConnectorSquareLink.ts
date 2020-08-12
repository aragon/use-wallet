import { SquarelinkConnector } from '@web3-react/squarelink-connector'
import { Connector } from '../types'

export default class ConnectorSquareLink implements Connector {
  web3ReactConnector({
    chainId,
    clientId,
    options,
  }: {
    chainId: number
    clientId: string
    options: any
  }) {
    return new SquarelinkConnector({ clientId, networks: [chainId], options })
  }
}
