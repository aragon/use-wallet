export function getNetworkName(chainId) {
  chainId = String(chainId)

  if (chainId === '1') return 'Mainnet'
  if (chainId === '3') return 'Ropsten'
  if (chainId === '4') return 'Rinkeby'

  return 'Unknown'
}

export function rpcResult(response) {
  // Some providers don’t wrap the response
  if (response && response.jsonrpc) {
    if (response.error) {
      throw new Error(response.error)
    }
    return response.result
  }
  return response
}

export async function getAccountIsContract(ethereum, account) {
  try {
    const code = await ethereum.send('eth_getCode', [account]).then(rpcResult)
    return code !== '0x'
  } catch (err) {
    return false
  }
}

export async function getAccountBalance(ethereum, account) {
  return ethereum.send('eth_getBalance', [account, 'latest']).then(rpcResult)
}

export async function getBlockNumber(ethereum) {
  return ethereum.send('eth_blockNumber', []).then(rpcResult)
}

export function pollEvery(fn, delay) {
  let timer = -1
  let stop = false
  const poll = async (request, onResult) => {
    const result = await request()
    if (!stop) {
      onResult(result)
      timer = setTimeout(poll.bind(null, request, onResult), delay)
    }
  }
  return (...params) => {
    const { request, onResult } = fn(...params)
    stop = false
    poll(request, onResult)
    return () => {
      stop = true
      clearTimeout(timer)
    }
  }
}
