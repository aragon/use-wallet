import { getNetworkName } from './utils'

export class ChainUnsupportedError extends Error {
  constructor(chainId, expectedChainId, ...params) {
    super(...params)
    this.name = 'UnsupportedChainError'
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
  constructor(connectorId, ...params) {
    super(...params)
    this.name = 'UnsupportedConnectorError'
    this.message = `Unsupported connector: ${connectorId}.`
  }
}

export class ConnectionRejectedError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'RejectedActivationError'
    this.message = `The activation has been rejected by the provider.`
  }
}

export class ConnectorConfigError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'ConnectorConfigError'
  }
}
