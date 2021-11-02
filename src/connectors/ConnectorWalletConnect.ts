import { Connector, RpcData } from '../types'
import { ConnectionRejectedError, ConnectorConfigError } from '../errors'

export default async function init(): Promise<Connector> {
  const { UserRejectedRequestError, WalletConnectConnector } = await import(
    '@web3-react/walletconnect-connector'
  )
  return {
    web3ReactConnector({
      rpc,
      bridge,
      pollingInterval,
    }: {
      rpc: RpcData
      bridge: any
      pollingInterval: number
    }) {
      if (!rpc) {
        throw new ConnectorConfigError(
          'The WalletConnect connector requires rpcUrl to be set.'
        )
      }
      Object.values(rpc).forEach((url: string) => {
        if (!/^https?:\/\//.test(url)) {
          throw new ConnectorConfigError(
            'The WalletConnect connector requires rpcUrl to be an HTTP URL.'
          )
        }
        return
      })
      return new WalletConnectConnector({
        bridge,
        pollingInterval,
        qrcode: true,
        rpc,
      })
    },
    handleActivationError(err: Error) {
      return err instanceof UserRejectedRequestError
        ? new ConnectionRejectedError()
        : null
    },
  }
}
