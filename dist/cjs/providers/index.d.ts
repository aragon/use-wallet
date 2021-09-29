import { Provider } from '../types';
declare global {
    interface Window {
        ethereum: any;
    }
}
declare const PROVIDERS: Map<string, Provider>;
declare function getProvider(providerId: string): Provider | undefined;
declare function getProviderString(string: string, providerId?: string): string;
declare function identifyProvider(provider: any): "frame" | "metamask" | "unknown";
declare function getProviderFromUseWalletId(id: string): Provider | undefined;
export { getProvider, identifyProvider, getProviderString, getProviderFromUseWalletId, };
export default PROVIDERS;
