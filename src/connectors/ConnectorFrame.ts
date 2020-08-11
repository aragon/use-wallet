import {
  FrameConnector,
  UserRejectedRequestError as FrameUserRejectedRequestError,
} from '@web3-react/frame-connector'
import { Connector } from '../types'
import { ConnectionRejectedError } from '../errors'

export default class ConnectorFrame implements Connector {
  web3ReactConnector({ chainId }: { chainId: number }) {
    return new FrameConnector({ supportedChainIds: [chainId] })
  }
  handleActivationError(err: Error) {
    if (err instanceof FrameUserRejectedRequestError) {
      return new ConnectionRejectedError()
    }
    if (err.message.startsWith('JSON.parse')) {
      return new Error(
        'There seems to be an issue when trying to connect to Frame.'
      )
    }
    return null
  }
}
