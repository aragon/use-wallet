import { EthereumProvider } from '../types';
export declare function useWatchBlockNumber({ ethereum, pollBlockNumberInterval, }: {
    ethereum: EthereumProvider;
    pollBlockNumberInterval: number;
}): {
    addBlockNumberListener: (cb: any) => void;
    removeBlockNumberListener: (cb: any) => void;
};
