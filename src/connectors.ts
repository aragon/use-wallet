import { ConnectorConfig, ConnectorInit } from './types'
import initFortmatic from './connectors/ConnectorFortmatic'
import initFrame from './connectors/ConnectorFrame'
import initInjected from './connectors/ConnectorInjected'
import initPortis from './connectors/ConnectorPortis'
import initProvided from './connectors/ConnectorProvided'
import initTorus from './connectors/ConnectorTorus'
import initWalletConnect from './connectors/ConnectorWalletConnect'
import initWalletLink from './connectors/ConnectorWalletLink'
import initLedger from './connectors/ConnectorLedger'

export function getConnectors(
  initsOrConfigs: { [key: string]: ConnectorInit | ConnectorConfig } = {}
) {
  const connectors: {
    [key: string]: [ConnectorInit, ConnectorConfig | null]
  } = {
    fortmatic: [initFortmatic, null],
    frame: [initFrame, null],
    injected: [initInjected, null],
    portis: [initPortis, null],
    provided: [initProvided, null],
    torus: [initTorus, null],
    walletconnect: [initWalletConnect, null],
    walletlink: [initWalletLink, null],
    ledger: [initLedger, null],
  }

  for (const [id, initOrConfig] of Object.entries(initsOrConfigs)) {
    // If initOrConfig is a function, it is an initializer.
    if (typeof initOrConfig === 'function') {
      connectors[id] = [initOrConfig as ConnectorInit, null]
      continue
    }

    // Otherwise it is a config
    if (connectors[id]) {
      connectors[id][1] = initOrConfig as ConnectorConfig
    }
  }

  return connectors
}
