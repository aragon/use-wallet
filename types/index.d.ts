declare module 'use-wallet' {
  import { ReactNode } from 'react';

  type Connectors = Partial<{
    authereum: {}
    fortmatic: { apiKey: string }
    frame: {}
    injected: {}
    portis: { dAppId: string }
    squarelink: { clientId: string; options: object }
    provided: {}
    torus: {
      chainId?: number;
      initOptions: object;
      constructorOptions: object;
    }
    walletconnect: { rpcUrl: string }
    walletlink: { url: string; appName: string; appLogoUrl: string }
  }>

  export interface Wallet<T> {
    account: string | null
    balance: string
    chainId: number | null
    connect(connectorId: keyof Connectors): Promise<void>
    connector: keyof Connectors
    connectors: Connectors
    error: UnsupportedChainError | UnsupportedChainError | RejectedActivationError | ConnectorConfigError
    ethereum: T
    networkName: string
    getBlockNumber(): number
    reset(): void
    status: string
    type: string | null
  }

  interface UseWalletProviderProps {
    chainId: number
    children: ReactNode
    connectors?: Connectors
    pollBalanceInterval?: number
    pollBlockNumberInterval?: number
  }

  interface UseWalletProps {
    pollBalanceInterval?: number
    pollBlockNumberInterval?: number
  }

  export class ChainUnsupportedError extends Error {
    name: 'ChainUnsupportedError'
  }

  export class ConnectorUnsupportedError extends Error {
    name: 'ConnectorUnsupportedError'
  }

  export class ConnectionRejectedError extends Error {
    name: 'ConnectionRejectedError'
  }

  export class ConnectorConfigError extends Error {
    name: 'ConnectorConfigError'
  }

  export function useWallet<T>(props?: UseWalletProps): Wallet<T>

  export function UseWalletProvider(props: UseWalletProviderProps)
}
