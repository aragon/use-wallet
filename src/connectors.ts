import { ConnectorConfig, ConnectorInit } from './types'
import initInjected from './connectors/ConnectorInjected'

export function getConnectors(
  initsOrConfigs: { [key: string]: ConnectorInit | ConnectorConfig } = {}
) {
  const connectors: {
    [key: string]: [ConnectorInit, ConnectorConfig | null]
  } = {
    injected: [initInjected, null],
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
