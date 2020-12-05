import { Connector, EthereumProvider } from '../types'
import { ConnectionRejectedError } from '../errors'

export default async function init(): Promise<Connector> {
  const { ProvidedConnector, UserRejectedRequestError } = await import(
    '@aragon/provided-connector'
  )
  return {
    web3ReactConnector({
      chainId,
      provider,
    }: {
      chainId: number
      provider: EthereumProvider
    }) {
      return new ProvidedConnector({
        provider,
        supportedChainIds: [chainId],
      })
    },
    handleActivationError(err: Error) {
      return err instanceof UserRejectedRequestError
        ? new ConnectionRejectedError()
        : null
    },
  }
}
