import { ChainInformation, ChainType } from './types';
/**
 * This method checks whether a particular chain id is known.
 *
 * @param {number} chainId chain id to check
 * @returns {boolean} true if chain is known
 */
export declare function isKnownChain(chainId: number): boolean;
/**
 *
 * @param {number} chainId chain id to retrieve information for
 * @throws {ChainUnknownError} if chain is unknown
 * @returns {boolean} information for specified chain
 */
export declare function getChainInformation(chainId: number): ChainInformation | ChainType;
/**
 * This is a getter method to returns the chain ids of all known chains.
 *
 * @returns {number[]} array of chain Ids
 */
export declare function getKnownChainsIds(): number[];
/**
 * This is a getter method to return all information available for each known chain.
 *
 * @returns {ChainInformation | ChainType[]} An array containing information for
 * each known chain
 */
export declare function getKnownChainInformation(): ChainInformation | ChainType[];
export declare function getDefaultChainId(): number;
