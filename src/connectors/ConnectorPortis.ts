import { Connector } from '../types'
import { ConnectorConfigError } from '../errors'

export default async function init(): Promise<Connector> {
  const { PortisConnector } = await import('@web3-react/portis-connector')
  return {
    web3ReactConnector({
      chainId,
      dAppId,
    }: {
      chainId: number
      dAppId: string
    }) {
      if (!dAppId) {
        throw new ConnectorConfigError(
          'The Portis connector requires dAppId to be set.'
        )
      }
      return new PortisConnector({ dAppId, networks: [chainId] })
    },
  }
}
