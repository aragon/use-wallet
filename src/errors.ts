import { getNetworkName } from './utils'

export class ChainUnsupportedError extends Error {
  constructor(chainId: number, expectedChainId: number, ...params: any[]) {
    super(...params)
    this.name = 'ChainUnsupportedError'
    this.message =
      `Unsupported chain: ${getNetworkName(chainId)}${
        chainId === -1 ? '' : ` (Chain ID: ${chainId})`
      }. ` +
      `Required chain: ${getNetworkName(
        expectedChainId
      )} (Chain ID: ${expectedChainId}).`
  }
}

export class ConnectorUnsupportedError extends Error {
  constructor(connectorId: string, ...params: any[]) {
    super(...params)
    this.name = 'ConnectorUnsupportedError'
    this.message = `Unsupported connector: ${connectorId}.`
  }
}

export class ConnectionRejectedError extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = 'ConnectionRejectedError'
    this.message = `The activation has been rejected by the provider.`
  }
}

export class ConnectorConfigError extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = 'ConnectorConfigError'
  }
}
