import {
  InjectedConnector,
  UserRejectedRequestError as InjectedUserRejectedRequestError,
} from '@web3-react/injected-connector'
import { Connector } from '../types'
import { ConnectionRejectedError } from '../errors'

export default class ConnectorInjected implements Connector {
  web3ReactConnector({ chainId }: { chainId: number }) {
    return new InjectedConnector({ supportedChainIds: [chainId] })
  }
  handleActivationError(err: Error) {
    return err instanceof InjectedUserRejectedRequestError
      ? new ConnectionRejectedError()
      : null
  }
}
