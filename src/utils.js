export function getNetworkName(chainId) {
  chainId = String(chainId)

  if (chainId === '1') return 'Mainnet'
  if (chainId === '3') return 'Ropsten'
  if (chainId === '4') return 'Rinkeby'

  return 'Unknown'
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
