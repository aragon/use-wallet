import { Account, EthereumProvider } from './types';
export declare function rpcResult(response: unknown): unknown | null;
export declare function getAccountIsContract(ethereum: EthereumProvider, account: Account): Promise<boolean>;
export declare function getAccountBalance(ethereum: EthereumProvider, account: Account): Promise<any>;
export declare function getBlockNumber(ethereum: EthereumProvider): Promise<any>;
export declare function pollEvery<R, T>(fn: (...params: T[]) => {
    request: () => Promise<R>;
    onResult: (result: R) => void;
}, delay: number): (...params: T[]) => () => void;
