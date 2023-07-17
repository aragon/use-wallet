import { Connector, RpcData } from '../types'
import { ConnectorConfigError } from '../errors'
import {
  WalletConnect,
  WalletConnectConstructorArgs,
} from '@web3-react/walletconnect-v2'

export default async function init(): Promise<Connector> {
  const { WalletConnect } = await import('@web3-react/walletconnect-v2')

  class WalletConnectExtended {
    private walletConnect: WalletConnect

    constructor(args: WalletConnectConstructorArgs) {
      this.walletConnect = new WalletConnect(args)
    }

    public async getProvider(): Promise<any> {
      return this.walletConnect.provider
    }

    public async getAccount(): Promise<null | string> {
      return this.walletConnect.provider?.accounts[0] || null
    }

    public async activate(desiredChainId?: number): Promise<any> {
      await this.walletConnect.activate(desiredChainId)
      return this.getProvider()
    }

    public async deactivate(): Promise<void> {
      return this.walletConnect.deactivate()
    }

    // Fake beeing an event emitter
    public on(
      event: string,
      callback: (args: any) => void
    ): WalletConnectExtended {
      this.walletConnect.provider?.on(event as any, callback)
      return this
    }
    public off(
      event: string,
      callback: (args: any) => void
    ): WalletConnectExtended {
      this.walletConnect.provider?.off(event as any, callback)
      return this
    }
  }

  return {
    web3ReactConnector({
      rpc,
      projectId,
    }: {
      rpc: RpcData
      projectId: string
    }) {
      if (!rpc || !projectId) {
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
      return new WalletConnectExtended({
        options: {
          projectId,
          showQrModal: true,
          rpcMap: rpc,
          chains: Object.keys(rpc).map((chainId) => parseInt(chainId)),
        },
        actions: {
          startActivation: () => () => {},
          update: () => {
            return 'asdf'
          },
          resetState: () => {},
        },
      })
    },
  }
}
