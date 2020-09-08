import { Connector } from '../types'
import { ConnectorConfigError } from '../errors'

export default async function init(): Promise<Connector> {
  const { FortmaticConnector } = await import('@web3-react/fortmatic-connector')
  return {
    web3ReactConnector({
      chainId,
      apiKey,
    }: {
      chainId: number
      apiKey: string
    }) {
      if (!apiKey) {
        throw new ConnectorConfigError(
          'The Fortmatic connector requires apiKey to be set.'
        )
      }
      return new FortmaticConnector({ apiKey, chainId })
    },
  }
}
