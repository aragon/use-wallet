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

export const KNOWN_CHAINS = new Map<number, ChainInformation | chainNameOnly>([
  [
    1,
    {
      nativeCurrency: ETH,
      network: 'main',
      fullName: 'Ethereum Mainnet',
      shortName: 'Mainnet',
      explorerUrl: `https://etherscan.io`,
    },
  ],
  [
    2,
    {
      network: 'expanse',
    },
  ],
  [
    3,
    {
      nativeCurrency: ETH,
      network: 'ropsten',
      fullName: 'Ethereum Ropsten',
      shortName: 'Ropsten',
      explorerUrl: `https://ropsten.etherscan.io`,
    },
  ],
  [
    4,
    {
      nativeCurrency: ETH,
      network: 'rinkeby',
      fullName: 'Ethereum Rinkeby',
      shortName: 'Rinkeby',
      explorerUrl: `https://rinkeby.etherscan.io`,
    },
  ],
  [
    5,
    {
      nativeCurrency: ETH,
      network: 'goerli',
      fullName: 'Ethereum Goerli',
      shortName: 'Goerli',
      explorerUrl: `https://goerli.etherscan.io`,
    },
  ],
  [
    8,
    {
      network: 'ubiq',
    },
  ],
  [
    42,
    {
      nativeCurrency: ETH,
      network: 'kovan',
      fullName: 'Ethereum Kovan',
      shortName: 'Kovan',
      explorerUrl: `https://kovan.etherscan.io`,
    },
  ],
  [
    100,
    {
      network: 'xdai',
    },
  ],
  [
    137,
    {
      nativeCurrency: MATIC,
      network: 'matic',
      fullName: 'Polygon Mainnet',
      shortName: 'Matic',
      explorerUrl: `https://polygonscan.com`,
    },
  ],
  [
    80001,
    {
      nativeCurrency: MATIC,
      network: 'mumbai',
      fullName: 'Polygon Testnet',
      shortName: 'Mumbai',
      explorerUrl: `https://mumbai.polygonscan.com`,
    },
  ],
  [
    1337,
    {
      network: 'local',
    },
  ],
  [
    5777,
    {
      network: 'ganache',
    },
  ],
])
