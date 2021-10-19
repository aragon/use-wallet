import { ChainUnknownError } from './errors'
import { ChainInformation, ChainType, Currency } from './types'

const ETH: Currency = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

const MATIC: Currency = {
  name: 'Matic Token',
  symbol: 'MATIC',
  decimals: 18,
}

const AVAX: Currency = {
  name: 'Avax',
  symbol: 'AVAX',
  decimals: 9,
}

const ONE: Currency = {
  name: 'ONE Token',
  symbol: 'ONE',
  decimals: 18,
}

const CHAIN_INFORMATION = new Map<number, ChainInformation | ChainType>([
  [
    1,
    {
      id: 1,
      nativeCurrency: ETH,
      type: 'main',
      fullName: 'Ethereum Mainnet',
      shortName: 'Ethereum',
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
      fullName: 'Ropsten Testnet',
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
      fullName: 'Rinkeby Testnet',
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
      fullName: 'Goerli Testnet',
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
      fullName: 'Kovan Testnet',
      shortName: 'Kovan',
      explorerUrl: `https://kovan.etherscan.io`,
    },
  ],
  [
    43112,
    {
      id: 43112,
      nativeCurrency: AVAX,
      type: 'avalocal',
      shortName: 'Avalanche Local',
      fullName: 'Avalanche Local',
    },
  ],
  [
    43113,
    {
      id: 43113,
      nativeCurrency: AVAX,
      type: 'fuji',
      fullName: 'Avalanche Fuji',
      shortName: 'Fuji',
      explorerUrl: 'https://cchain.explorer.avax-test.network/',
    },
  ],
  [
    43114,
    {
      id: 43114,
      nativeCurrency: AVAX,
      type: 'avalanche',
      fullName: 'Avalanche Mainnet',
      shortName: 'Avalanche',
      explorerUrl: 'https://cchain.explorer.avax.network/',
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
      shortName: 'Polygon',
      explorerUrl: `https://polygonscan.com`,
    },
  ],
  [
    80001,
    {
      id: 80001,
      nativeCurrency: MATIC,
      type: 'mumbai',
      fullName: 'Mumbai Testnet',
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

/**
 * This method checks whether a particular chain id is known.
 *
 * @param {number} chainId chain id to check
 * @returns {boolean} true if chain is known
 */
export function isKnownChain(chainId: number): boolean {
  return CHAIN_INFORMATION.has(chainId)
}

/**
 *
 * @param {number} chainId chain id to retrieve information for
 * @throws {ChainUnknownError} if chain is unknown
 * @returns {boolean} information for specified chain
 */
export function getChainInformation(
  chainId: number
): ChainInformation | ChainType {
  const chainInfo = CHAIN_INFORMATION.get(chainId)
  if (!chainInfo) throw new ChainUnknownError(`Unknown chain id: ${chainId}`)
  return chainInfo
}

/**
 * This is a getter method to returns the chain ids of all known chains.
 *
 * @returns {number[]} array of chain Ids
 */
export function getKnownChainsIds(): number[] {
  return Array.from(CHAIN_INFORMATION.keys())
}

/**
 * This is a getter method to return all information available for each known chain.
 *
 * @returns {ChainInformation | ChainType[]} An array containing information for
 * each known chain
 */
export function getKnownChainInformation(): ChainInformation | ChainType[] {
  return Array.from(CHAIN_INFORMATION.values())
}

export function getDefaultChainId(): number {
  return 1
}
