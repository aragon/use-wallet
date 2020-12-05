import { Connector } from '../types'
import { ConnectionRejectedError } from '../errors'

export default async function init(): Promise<Connector> {
  const { FrameConnector, UserRejectedRequestError } = await import(
    '@web3-react/frame-connector'
  )
  return {
    web3ReactConnector({ chainId }: { chainId: number }) {
      return new FrameConnector({ supportedChainIds: [chainId] })
    },
    handleActivationError(err: Error) {
      if (err instanceof UserRejectedRequestError) {
        return new ConnectionRejectedError()
      }
      if (err.message.startsWith('JSON.parse')) {
        return new Error(
          'There seems to be an issue when trying to connect to Frame.'
        )
      }
      return null
    },
  }
}
