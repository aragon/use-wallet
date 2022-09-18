import type { ReactNode } from 'react';
import * as PropTypes from 'prop-types';
import { Connector, ConnectorConfig, Wallet } from './types';
import { ConnectionRejectedError, ChainUnsupportedError, ConnectorUnsupportedError } from './errors';
import { blockExplorerUrl, getLastActiveAccount } from './utils';
import { getProviderFromUseWalletId, getProviderString } from './providers/index';
import * as chains from './chains';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
declare function useWallet(): Wallet;
declare type UseWalletProviderWrapperProps = {
    getLibrary?: (provider?: any, connector?: Required<Web3ReactContextInterface>['connector']) => any;
} & UseWalletProviderProps;
declare type UseWalletProviderProps = {
    children: ReactNode;
    connectors: {
        [key: string]: Connector | ConnectorConfig;
    };
    autoConnect: boolean;
    pollBalanceInterval: number;
    pollBlockNumberInterval: number;
};
declare function UseWalletProviderWrapper({ getLibrary, ...props }: UseWalletProviderWrapperProps): JSX.Element;
declare namespace UseWalletProviderWrapper {
    var propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        connectors: PropTypes.Requireable<{
            [x: string]: object | null | undefined;
        }>;
        autoConnect: PropTypes.Requireable<boolean>;
        pollBalanceInterval: PropTypes.Requireable<number>;
        pollBlockNumberInterval: PropTypes.Requireable<number>;
    };
    var defaultProps: {
        connectors: {};
        autoConnect: boolean;
        pollBalanceInterval: number;
        pollBlockNumberInterval: number;
    };
}
export { ConnectionRejectedError, ChainUnsupportedError, ConnectorUnsupportedError, UseWalletProviderWrapper as UseWalletProvider, useWallet, getProviderString, getProviderFromUseWalletId, blockExplorerUrl, getLastActiveAccount, chains, };
