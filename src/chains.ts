import { ChainInformation, chainNameOnly } from './types'

const ETH = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

const MATIC = {
  name: 'Matic Token',
  symbol: 'MATIC',
  decimals: 18,
}

const ONE = {
  name: 'ONE Token',
  symbol: 'ONE',
  decimals: 18,
}

export const KNOWN_CHAINS = new Map<number, ChainInformation | chainNameOnly>([
  [
    1,
    {
      id: 1,
      nativeCurrency: ETH,
      type: 'main',
      fullName: 'Ethereum Mainnet',
      shortName: 'Mainnet',
      explorerUrl: `https://etherscan.io`,
    },
  ],
  [
    2,
    {
      id: 2,
      type: 'expanse',
    },
  ],
  [
    3,
    {
      id: 3,
      nativeCurrency: ETH,
      type: 'ropsten',
      fullName: 'Ethereum Ropsten',
      shortName: 'Ropsten',
      explorerUrl: `https://ropsten.etherscan.io`,
    },
  ],
  [
    4,
    {
      id: 4,
      nativeCurrency: ETH,
      type: 'rinkeby',
      fullName: 'Ethereum Rinkeby',
      shortName: 'Rinkeby',
      explorerUrl: `https://rinkeby.etherscan.io`,
    },
  ],
  [
    5,
    {
      id: 5,
      nativeCurrency: ETH,
      type: 'goerli',
      fullName: 'Ethereum Goerli',
      shortName: 'Goerli',
      explorerUrl: `https://goerli.etherscan.io`,
    },
  ],
  [
    8,
    {
      id: 8,
      type: 'ubiq',
    },
  ],
  [
    42,
    {
      id: 42,
      nativeCurrency: ETH,
      type: 'kovan',
      fullName: 'Ethereum Kovan',
      shortName: 'Kovan',
      explorerUrl: `https://kovan.etherscan.io`,
    },
  ],
  [
    100,
    {
      id: 100,
      type: 'xdai',
    },
  ],
  [
    137,
    {
      id: 137,
      nativeCurrency: MATIC,
      type: 'matic',
      fullName: 'Polygon Mainnet',
      shortName: 'Matic',
      explorerUrl: `https://polygonscan.com`,
    },
  ],
  [
    80001,
    {
      id: 80001,
      nativeCurrency: MATIC,
      type: 'mumbai',
      fullName: 'Polygon Testnet',
      shortName: 'Mumbai',
      explorerUrl: `https://mumbai.polygonscan.com`,
    },
  ],
  [
    1666700000,
    {
      id: 1666700000,
      nativeCurrency: ONE,
      type: 'harmonyTest',
      fullName: 'Harmony ONE Testnet',
      shortName: 'Harmony Testnet',
      explorerUrl: `https://explorer.pops.one/`,
    },
  ],
  [
    1666600000,
    {
      id: 1666600000,
      nativeCurrency: ONE,
      type: 'harmony',
      fullName: 'Harmony ONE',
      shortName: 'Harmony',
      explorerUrl: `https://explorer.harmony.one/`,
    },
  ],
  [
    1337,
    {
      id: 1337,
      type: 'local',
    },
  ],
  [
    5777,
    {
      id: 5777,
      type: 'ganache',
    },
  ],
])
