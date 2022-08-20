import { Account, EthereumProvider } from './types';
export declare const blockExplorerUrl: (type: string, value: string, chainId: number) => string;
export declare function rpcResult(response: unknown): unknown | null;
export declare function getAccountIsContract(ethereum: EthereumProvider, account: Account): Promise<boolean>;
export declare function getAccountBalance(ethereum: EthereumProvider, account: Account): Promise<any>;
export declare function getBlockNumber(ethereum: EthereumProvider): Promise<any>;
export declare function pollEvery<R, T>(fn: (...params: T[]) => {
    request: () => Promise<R>;
    onResult: (result: R) => void;
}, delay: number): (...params: T[]) => () => void;
export declare const setLastActiveAccount: (account: Account) => void;
export declare const clearLastActiveAccount: () => void;
export declare const getLastActiveAccount: () => Account | null;
export declare const setLastConnector: (connector: string) => void;
export declare const getLastConnector: () => string | null;
