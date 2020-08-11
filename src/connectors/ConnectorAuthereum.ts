import { AuthereumConnector } from '@web3-react/authereum-connector'
import { Connector } from '../types'

export default class ConnectorAuthereum implements Connector {
  web3ReactConnector({ chainId }: { chainId: number }) {
    return new AuthereumConnector({ chainId })
  }
}
