import { ChainInformation, chainNameOnly } from './types'

const ETH = {
  tokenName: 'Ether',
  tokenSymbol: 'ETH',
  tokenDecimals: 18,
}

const MATIC = {
  tokenName: 'Matic Token',
  tokenSymbol: 'MATIC',
  tokenDecimals: 18,
}

export const KNOWN_CHAINS = new Map<number, ChainInformation | chainNameOnly>([
  [
    1,
    {
      ...ETH,
      chainName: 'main',
      fullName: 'Ethereum Mainnet',
      shortName: 'Mainnet',
    },
  ],
  [
    2,
    {
      chainName: 'expanse',
    },
  ],
  [
    3,
    {
      ...ETH,
      chainName: 'ropsten',
      fullName: 'Ethereum Ropsten',
      shortName: 'Ropsten',
    },
  ],
  [
    4,
    {
      ...ETH,
      chainName: 'rinkeby',
      fullName: 'Ethereum Rinkeby',
      shortName: 'Rinkeby',
    },
  ],
  [
    5,
    {
      ...ETH,
      chainName: 'goerli',
      fullName: 'Ethereum Goerli',
      shortName: 'Goerli',
    },
  ],
  [
    8,
    {
      chainName: 'ubiq',
    },
  ],
  [
    42,
    {
      ...ETH,
      chainName: 'kovan',
      fullName: 'Ethereum Kovan',
      shortName: 'Kovan',
    },
  ],
  [
    100,
    {
      chainName: 'xdai',
    },
  ],
  [
    137,
    {
      ...ETH,
      chainName: 'matic',
      fullName: 'Polygon Mainnet',
      shortName: 'Matic',
    },
  ],
  [
    80001,
    {
      ...MATIC,
      chainName: 'mumbai',
      fullName: 'Polygon Testnet',
      shortName: 'Mumbai',
    },
  ],
  [
    1337,
    {
      chainName: 'local',
    },
  ],
  [
    5777,
    {
      chainName: 'ganache',
    },
  ],
])
