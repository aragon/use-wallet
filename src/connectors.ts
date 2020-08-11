import { Connector } from './types'
// import ConnectorAuthereum from './connectors/ConnectorAuthereum'
import ConnectorFortmatic from './connectors/ConnectorFortmatic'
import ConnectorFrame from './connectors/ConnectorFrame'
import ConnectorInjected from './connectors/ConnectorInjected'
import ConnectorPortis from './connectors/ConnectorPortis'
import ConnectorProvided from './connectors/ConnectorProvided'
import ConnectorTorus from './connectors/ConnectorTorus'
import ConnectorWalletConnect from './connectors/ConnectorWalletConnect'
import ConnectorWalletLink from './connectors/ConnectorWalletLink'

interface ConnectorsInitsOrConfigs {
  [key: string]: Connector | any
}

export function getConnectors(
  connectorsInitsOrConfigs: ConnectorsInitsOrConfigs = {}
) {
  // Split the connector initializers from the confs.
  const inits: {
    [key: string]: any
  } = {}

  const configs: [string, any][] = []

  for (const [id, initOrConfig] of Object.entries(connectorsInitsOrConfigs)) {
    // Having a web3ReactConnector function is
    // the only prerequisite for an initializer.
    if (typeof initOrConfig.web3ReactConnector === 'function') {
      inits[id] = initOrConfig
      continue
    }

    configs.push([id, initOrConfig])
  }

  const connectors: {
    [key: string]: Connector & { _config?: object }
  } = {
    injected: new ConnectorInjected(),
    frame: new ConnectorFrame(),
    fortmatic: new ConnectorFortmatic(),
    portis: new ConnectorPortis(),
    provided: new ConnectorProvided(),
    // authereum: new ConnectorAuthereum(),
    torus: new ConnectorTorus(),
    walletconnect: new ConnectorWalletConnect(),
    walletlink: new ConnectorWalletLink(),
    ...inits,
  }

  // Attach the configs to their connectors.
  for (const [id, config] of configs) {
    if (connectors[id]) {
      connectors[id]._config = config
    }
  }

  return connectors
}
