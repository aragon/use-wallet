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
      type: 'main',
      fullName: 'Ethereum Mainnet',
      shortName: 'Mainnet',
      url: `https://etherscan.io`,
    },
  ],
  [
    2,
    {
      type: 'expanse',
    },
  ],
  [
    3,
    {
      ...ETH,
      type: 'ropsten',
      fullName: 'Ethereum Ropsten',
      shortName: 'Ropsten',
      url: `https://ropsten.etherscan.io`,
    },
  ],
  [
    4,
    {
      ...ETH,
      type: 'rinkeby',
      fullName: 'Ethereum Rinkeby',
      shortName: 'Rinkeby',
      url: `https://rinkeby.etherscan.io`,
    },
  ],
  [
    5,
    {
      ...ETH,
      type: 'goerli',
      fullName: 'Ethereum Goerli',
      shortName: 'Goerli',
      url: `https://goerli.etherscan.io`,
    },
  ],
  [
    8,
    {
      type: 'ubiq',
    },
  ],
  [
    42,
    {
      ...ETH,
      type: 'kovan',
      fullName: 'Ethereum Kovan',
      shortName: 'Kovan',
      url: `https://kovan.etherscan.io`,
    },
  ],
  [
    100,
    {
      type: 'xdai',
    },
  ],
  [
    137,
    {
      ...ETH,
      type: 'matic',
      fullName: 'Polygon Mainnet',
      shortName: 'Matic',
      url: `https://polygonscan.com`,
    },
  ],
  [
    80001,
    {
      ...MATIC,
      type: 'mumbai',
      fullName: 'Polygon Testnet',
      shortName: 'Mumbai',
      url: `https://mumbai.polygonscan.com`,
    },
  ],
  [
    1337,
    {
      type: 'local',
    },
  ],
  [
    5777,
    {
      type: 'ganache',
    },
  ],
])
