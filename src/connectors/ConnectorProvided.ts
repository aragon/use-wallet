import {
  ProvidedConnector,
  UserRejectedRequestError as ProvidedUserRejectedRequestError,
} from '@aragon/provided-connector'
import { Connector, EthereumProvider } from '../types'
import { ConnectionRejectedError } from '../errors'

export default class ConnectorProvided implements Connector {
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
  }
  handleActivationError(err: Error) {
    return err instanceof ProvidedUserRejectedRequestError
      ? new ConnectionRejectedError()
      : null
  }
}
