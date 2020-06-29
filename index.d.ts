declare module 'use-wallet' {
  import { ReactNode } from 'react';

  type Connectors = Partial<{
    authereum: {}
    fortmatic: { apiKey: string }
    frame: {}
    injected: {}
    portis: { dAppId: string }
    squarelink: { clientId: string; options: object }
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
    activate(connectorId: keyof Connectors): Promise<void>
    activated: keyof Connectors
    activating: boolean
    balance: string
    connected: boolean
    connectors: Connectors
    deactivate(): void
    chainId: number | null
    ethereum: T
    getBlockNumber(): number
    isContract: boolean
    networkName: string
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

  export class UnsupportedChainError extends Error {
    name: 'UnsupportedChainError'
  }

  export class UnsupportedConnectorError extends Error {
    name: 'UnsupportedConnectorError'
  }

  export class RejectedActivationError extends Error {
    name: 'RejectedActivationError'
  }

  export class ConnectorConfigError extends Error {
    name: 'ConnectorConfigError'
  }

  export function useWallet<T>(props?: UseWalletProps): Wallet<T>

  export function UseWalletProvider(props: UseWalletProviderProps)
}
