import { Provider } from '../types'

declare global {
  interface Window {
    ethereum: any
  }
}

function isElectron() {
  // See https://github.com/electron/electron/issues/2288
  return (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  )
}

const BASE_URL =
  'https://storageapi.fleek.co/aragonone-team-bucket/wallet-icons'

// See the corresponding prop type, EthereumProviderType, in prop-types.js.
const PROVIDERS = new Map<string, Provider>(
  [
    {
      id: 'frame',
      name: 'Frame',
      type: 'Desktop',
      image: `${BASE_URL}/Frame.png`,
      strings: {
        'your Ethereum wallet': 'Frame',
      },
    },
    {
      id: 'metamask',
      name: 'Metamask',
      type: 'Desktop',
      image: `${BASE_URL}/Metamask.png`,
      strings: {
        'your Ethereum wallet': 'Metamask',
      },
    },
    {
      id: 'status',
      name: 'Status',
      type: 'Mobile',
      image: `${BASE_URL}/Status.png`,
      strings: {
        'your Ethereum wallet': 'Status',
      },
    },
    {
      id: 'cipher',
      name: 'Cipher',
      type: 'Mobile',
      image: `${BASE_URL}/Cipher.png`,
      strings: {
        'your Ethereum wallet': 'Cipher',
      },
    },
    {
      id: 'fortmatic',
      name: 'Fortmatic',
      type: 'Any',
      image: `${BASE_URL}/Fortmatic.svg`,
      strings: {
        'your Ethereum wallet': 'Fortmatic',
      },
    },
    {
      id: 'portis',
      name: 'Portis',
      type: 'Any',
      image: `${BASE_URL}/Portis.svg`,
      strings: {
        'your Ethereum wallet': 'Portis',
      },
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      type: 'Any',
      image: `${BASE_URL}/walletconnect.png`,
      strings: {
        'your Ethereum wallet': 'WalletConnect',
      },
    },
    {
      id: 'unknown',
      name: 'Unknown',
      type: 'Desktop',
      image: `${BASE_URL}/wallet.svg`,
      strings: {
        'your Ethereum wallet': 'your wallet',
      },
    },
  ].map((provider) => [provider.id, provider])
)

// Get a providers object for a given ID.
function getProvider(providerId: string): Provider | undefined {
  return PROVIDERS.get(providerId)
}

// Get a string that depends on the current Ethereum provider.
// The default string is used as an identifier (à la gettext).
function getProviderString(string: string, providerId = 'unknown'): string {
  const provider = getProvider(providerId)
  return (provider && provider.strings[string]) || string
}

// Get an identifier for the provider, if it can be detected.
function identifyProvider(provider: any) {
  if (provider && isElectron()) {
    return 'frame'
  }
  if (provider && provider.isMetaMask) {
    return 'metamask'
  }
  return 'unknown'
}

// Get a provider from its useWallet() identifier.
function getProviderFromUseWalletId(id: string) {
  if (id === 'injected' || id === 'provided') {
    return (
      getProvider(identifyProvider(window.ethereum)) || getProvider('unknown')
    )
  }
  return getProvider(id) || getProvider('unknown')
}

export {
  getProvider,
  identifyProvider,
  getProviderString,
  getProviderFromUseWalletId,
}
export default PROVIDERS
