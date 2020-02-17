export function getNetworkName(chainId) {
  chainId = String(chainId)

  if (chainId === '1') return 'Mainnet'
  if (chainId === '3') return 'Ropsten'
  if (chainId === '4') return 'Rinkeby'

  return 'Unknown'
}

export function rpcResult(response) {
  // Some providers don’t wrap the response
  if (response && 'jsonrpc' in response) {
    if (response.error) {
      throw new Error(response.error)
    }
    return response.result || null
  }
  return response || null
}

async function sendCompat(ethereum, method, params) {
  // Old MetaMask versions are using sendAsync(), and web3.js 1.x is
  // overwriting send() with sendAsync(), despite them being incompatible.
  // There is no way to detect that send() follows the correct implementation,
  // so we use sendAsync() when it is available.
  if (ethereum.sendAsync && ethereum.selectedAddress) {
    return new Promise((resolve, reject) => {
      ethereum.sendAsync(
        { method, params, from: ethereum.selectedAddress },
        (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        }
      )
    }).then(rpcResult)
  }

  return ethereum.send(method, params).then(rpcResult)
}

export async function getAccountIsContract(ethereum, account) {
  try {
    const code = await sendCompat(ethereum, 'eth_getCode', [account])
    return code !== '0x'
  } catch (err) {
    return false
  }
}

export async function getAccountBalance(ethereum, account) {
  return sendCompat(ethereum, 'eth_getBalance', [account, 'latest'])
}

export async function getBlockNumber(ethereum) {
  return sendCompat(ethereum, 'eth_blockNumber', [])
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
