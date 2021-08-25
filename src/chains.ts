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
      url: `https://etherscan.io`,
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
      url: `https://ropsten.etherscan.io`,
    },
  ],
  [
    4,
    {
      ...ETH,
      chainName: 'rinkeby',
      fullName: 'Ethereum Rinkeby',
      shortName: 'Rinkeby',
      url: `https://rinkeby.etherscan.io`,
    },
  ],
  [
    5,
    {
      ...ETH,
      chainName: 'goerli',
      fullName: 'Ethereum Goerli',
      shortName: 'Goerli',
      url: `https://goerli.etherscan.io`,
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
      url: `https://kovan.etherscan.io`,
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
      url: `https://polygonscan.com`,
    },
  ],
  [
    80001,
    {
      ...MATIC,
      chainName: 'mumbai',
      fullName: 'Polygon Testnet',
      shortName: 'Mumbai',
      url: `https://mumbai.polygonscan.com`,
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
