import { TorusConnector } from '@web3-react/torus-connector'
import { Connector } from '../types'

export default class ConnectorTorus implements Connector {
  web3ReactConnector({
    chainId,
    initOptions,
    constructorOptions,
  }: {
    chainId: number
    initOptions: any
    constructorOptions: any
  }) {
    return new TorusConnector({
      chainId,
      constructorOptions,
      initOptions,
    })
  }
}
