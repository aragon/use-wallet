import JSBI from 'jsbi'
import { useRef, useCallback, useEffect } from 'react'

import { EthereumProvider } from '../types'
import { pollEvery, getBlockNumber } from '../utils'

// Only watch block numbers, and return functions allowing to subscribe to it.
export function useWatchBlockNumber({
  ethereum,
  pollBlockNumberInterval,
}: {
  ethereum: EthereumProvider
  pollBlockNumberInterval: number
}) {
  const lastBlockNumber = useRef<number | null>(null)

  // Using listeners lets useWallet() decide if it wants to expose the block
  // number, which implies to re-render whenever the block number updates.
  const blockNumberListeners = useRef<Set<(blockNumber: number) => void>>(
    new Set()
  )

  const addBlockNumberListener = useCallback((cb) => {
    if (blockNumberListeners.current.has(cb)) {
      return
    }

    // Immediately send the block number to the new listener
    cb(lastBlockNumber.current)

    // Add the listener
    blockNumberListeners.current.add(cb)
  }, [])

  const removeBlockNumberListener = useCallback((cb) => {
    blockNumberListeners.current.delete(cb)
  }, [])

  // Update the block number and broadcast it to the listeners
  const updateBlockNumber = useCallback((blockNumber) => {
    if (lastBlockNumber.current === blockNumber) {
      return
    }

    lastBlockNumber.current = blockNumber
    blockNumberListeners.current.forEach((cb) => cb(blockNumber))
  }, [])

  useEffect(() => {
    if (!ethereum) {
      updateBlockNumber(null)
      return
    }

    let cancel = false

    const pollBlockNumber = pollEvery(() => {
      return {
        request: () => getBlockNumber(ethereum),
        onResult: (latestBlockNumber: number) => {
          if (!cancel) {
            updateBlockNumber(
              latestBlockNumber === null
                ? null
                : JSBI.BigInt(latestBlockNumber).toString()
            )
          }
        },
      }
    }, pollBlockNumberInterval)

    const stopPollingBlockNumber = pollBlockNumber()

    return () => {
      cancel = true
      stopPollingBlockNumber()
    }
  }, [ethereum, pollBlockNumberInterval, updateBlockNumber])

  return { addBlockNumberListener, removeBlockNumberListener }
}
