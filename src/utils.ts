import { Account, EthereumProvider, ChainInformation } from './types'
import { getChainInformation, getKnownChainsIds } from './chains'

function isUnwrappedRpcResult(response: unknown): response is {
  error?: string
  result?: unknown
} {
  return (
    typeof response === 'object' && response !== null && 'jsonrpc' in response
  )
}

const EXPLORER_URL_TYPES = new Map([
  ['block', 'block'],
  ['transaction', 'tx'],
  ['address', 'address'],
  ['token', 'token'],
])

export const blockExplorerUrl = (
  type: string,
  value: string,
  chainId: number
) => {
  if (!getKnownChainsIds().includes(chainId)) {
    return ''
  }

  if (!EXPLORER_URL_TYPES.has(type)) {
    throw new Error('type not supported.')
  }

  const domain = (getChainInformation(chainId) as ChainInformation).explorerUrl
  const typePart = EXPLORER_URL_TYPES.get(type)
  return `${domain}/${typePart}/${value}`
}

export function rpcResult(response: unknown): unknown | null {
  // Some providers don’t wrap the response
  if (isUnwrappedRpcResult(response)) {
    if (response.error) {
      throw new Error(response.error)
    }
    return response.result || null
  }

  return response || null
}

async function ethereumRequest(
  ethereum: EthereumProvider,
  method: string,
  params: string[]
): Promise<any> {
  // If ethereum.request() exists, the provider is probably EIP-1193 compliant.
  if (ethereum.request) {
    return ethereum.request({ method, params }).then(rpcResult)
  }

  // This is specific to some older versions of MetaMask combined with Web3.js.
  if (ethereum.sendAsync && ethereum.selectedAddress) {
    return new Promise((resolve, reject) => {
      ethereum.sendAsync(
        {
          method,
          params,
          from: ethereum.selectedAddress,
          jsonrpc: '2.0',
          id: 0,
        },
        (err: Error, result: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        }
      )
    }).then(rpcResult)
  }

  // If none of the previous two exist, we assume the provider is pre EIP-1193,
  // using .send() rather than .request().
  if (ethereum.send) {
    return ethereum.send(method, params).then(rpcResult)
  }

  throw new Error(
    'The Ethereum provider doesn’t seem to provide a request method.'
  )
}

export async function getAccountIsContract(
  ethereum: EthereumProvider,
  account: Account
): Promise<boolean> {
  try {
    const code = await ethereumRequest(ethereum, 'eth_getCode', [account])
    return code !== '0x'
  } catch (err) {
    return false
  }
}

export async function getAccountBalance(
  ethereum: EthereumProvider,
  account: Account
) {
  return ethereumRequest(ethereum, 'eth_getBalance', [account, 'latest'])
}

export async function getBlockNumber(ethereum: EthereumProvider) {
  return ethereumRequest(ethereum, 'eth_blockNumber', [])
}

export function pollEvery<R, T>(
  fn: (
    // As of TS 3.9, it doesn’t seem possible to specify dynamic params
    // as a generic type (e.g. using `T` here). Instead, we have to specify an
    // array in place (`T[]`), making it impossible to type params independently.
    ...params: T[]
  ) => {
    request: () => Promise<R>
    onResult: (result: R) => void
  },
  delay: number
) {
  let timer: any // can be TimeOut (Node) or number (web)
  let stop = false
  const poll = async (
    request: () => Promise<R>,
    onResult: (result: R) => void
  ) => {
    const result = await request()
    if (!stop) {
      onResult(result)
      timer = setTimeout(poll.bind(null, request, onResult), delay)
    }
  }
  return (...params: T[]) => {
    const { request, onResult } = fn(...params)
    stop = false
    poll(request, onResult)
    return () => {
      stop = true
      clearTimeout(timer)
    }
  }
}

const ACCOUNT_KEY = 'LAST_ACTIVE_ACCOUNT'
const CONNECTOR_KEY = 'LAST_WALLET_CONNECTOR'

export const setLastActiveAccount = (account: Account) => {
  localStorage?.setItem(ACCOUNT_KEY, account)
}

export const clearLastActiveAccount = () => {
  localStorage?.removeItem(ACCOUNT_KEY)
}

export const getLastActiveAccount = (): Account | null => {
  return localStorage?.getItem(ACCOUNT_KEY)
}

export const setLastConnector = (connector: string) => {
  localStorage?.setItem(CONNECTOR_KEY, connector)
}

export const getLastConnector = (): string | null => {
  return localStorage?.getItem(CONNECTOR_KEY)
}
