export function getNetworkName(chainId) {
  chainId = String(chainId)

  if (chainId === '1') return 'Mainnet'
  if (chainId === '3') return 'Ropsten'
  if (chainId === '4') return 'Rinkeby'

  return 'Unknown'
}

export function rpcResult(response) {
  // Some providers don’t wrap the response
  if (typeof response === 'object' && 'jsonrpc' in response) {
    if (response.error) {
      throw new Error(response.error)
    }
    return response.result || null
  }
  return response || null
}

async function sendCompat(ethereum, method, params) {
  // As of today (2020-02-17), MetaMask defines a send() method that correspond
  // to the one defined in EIP 1193. This is a breaking change since MetaMask
  // used to define a send() method that was an alias of the sendAsync()
  // method, and has a different signature than the send() defined by EIP 1193.
  // The latest version of Web3.js (1.2.6) is overwriting the ethereum.send()
  // provided by MetaMask, to replace it with ethereum.sendAsync(), making it
  // incompatible with EIP 1193 again.
  // This  means there is no way to detect that the ethereum.send() provided
  // corresponds to EIP 1193 or not. This is why we use sendAsync() when
  // available and send() otherwise, rather than the other way around.
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
