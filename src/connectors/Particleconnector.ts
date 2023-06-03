import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { Config, ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';


export class ParticleConnector extends AbstractConnector {
    private particleNetwork: ParticleNetwork;
    private particleProvider: ParticleProvider | undefined;

    constructor(private config: Config) {
        super({ supportedChainIds: config?.wallet?.supportChains?.map(item => item.id) });
        this.particleNetwork = new ParticleNetwork(this.config);
        this.handleChainChanged = this.handleChainChanged.bind(this)
        this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
        this.handleDisconnect = this.handleDisconnect.bind(this)
    }
    async activate(): Promise<ConnectorUpdate<string | number>> {
        if (!this.particleProvider) {
            this.particleProvider = new ParticleProvider(this.particleNetwork.auth);
        }
        if (!this.particleNetwork.auth.isLogin()) {
            //TODO: connect with particle network, set your custom options
            const authType = (window as any).particle_auth_type ? (window as any).particle_auth_type : 'email';
            await this.particleNetwork.auth.login({
                preferredAuthType: authType,
            });
        }
        const account = await this.getAccount();
        const chainId = await this.getChainId();

        this.particleProvider.on('disconnect', this.handleDisconnect)
        this.particleProvider.on('chainChanged', this.handleChainChanged)
        this.particleProvider.on('accountsChanged', this.handleAccountsChanged)
        return {
            provider: this.particleProvider,
            account,
            chainId,
        };
    }
    async getProvider(): Promise<any> {
        return this.particleProvider;
    }
    async getChainId(): Promise<string | number> {
        return this.particleNetwork.auth.chainId();
    }
    async getAccount(): Promise<string | null> {
        if (this.particleProvider) {
            return this.particleProvider.request({ method: 'eth_accounts' }).then((accounts): string => accounts[0]);
        } else {
            return null;
        }
    }
    async deactivate() {
        await this.particleNetwork.auth.logout();
        this.emitDeactivate();
    }

    private handleChainChanged(chainId: number | string): void {
        this.emitUpdate({ chainId })
    }

    private handleAccountsChanged(accounts: string[]): void {
        this.emitUpdate({ account: accounts[0] })
    }
    private handleDisconnect(): void {
        this.emitDeactivate()
        if (this.particleProvider) {
            this.particleProvider.disconnect()
            this.particleProvider.off('chainChanged', this.handleChainChanged)
            this.particleProvider.off('accountsChanged', this.handleAccountsChanged)
            this.particleProvider = undefined
        }

        this.emitDeactivate()
    }
}


export class UserRejectedRequestError extends Error {
    // constructor();
}
