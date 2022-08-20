import { Account, EthereumProvider } from '../types';
export declare function useWalletBalance({ account, ethereum, pollBalanceInterval, }: {
    account?: Account | null;
    ethereum?: EthereumProvider;
    pollBalanceInterval: number;
}): string;
