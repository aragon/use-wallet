import { ConnectorConfig, ConnectorInit } from './types';
export declare function getConnectors(initsOrConfigs?: {
    [key: string]: ConnectorInit | ConnectorConfig;
}): {
    [key: string]: [ConnectorInit, ConnectorConfig | null];
};
