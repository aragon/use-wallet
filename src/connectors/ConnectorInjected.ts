import { Connector } from '../types'
import { ConnectionRejectedError } from '../errors'

export default async function init(): Promise<Connector> {
  const { InjectedConnector, UserRejectedRequestError } = await import(
    '@web3-react/injected-connector'
  )
  return {
    web3ReactConnector({ supportedChainIds }: { supportedChainIds: [] }) {
      return new InjectedConnector({ supportedChainIds })
    },
    handleActivationError(err: Error) {
      return err instanceof UserRejectedRequestError
        ? new ConnectionRejectedError()
        : null
    },
  }
}
