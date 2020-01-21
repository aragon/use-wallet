import { getNetworkName } from './utils'

export class UnsupportedChainError extends Error {
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

export class UnsupportedConnectorError extends Error {
  constructor(connectorId, ...params) {
    super(...params)
    this.name = 'UnsupportedConnectorError'
    this.message = `Unsupported connector: ${connectorId}.`
  }
}

export class RejectedActivationError extends Error {
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
