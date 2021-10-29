import JSBI from 'jsbi'
import { useState, useEffect } from 'react'
import { Account, EthereumProvider, Balance } from '../types'
import { pollEvery, getAccountBalance } from '../utils'

const NO_BALANCE = '-1'

export function useWalletBalance({
  account,
  ethereum,
  pollBalanceInterval,
}: {
  account?: Account | null
  ethereum?: EthereumProvider
  pollBalanceInterval: number
}) {
  const [balance, setBalance] = useState<Balance>(NO_BALANCE)

  useEffect(() => {
    if (!account || !ethereum) {
      return
    }

    let cancel = false

    // Poll wallet balance
    const pollBalance = pollEvery<Balance, any>(
      (
        account: Account,
        ethereum: EthereumProvider,
        onUpdate: (balance: Balance) => void
      ) => {
        let lastBalance = NO_BALANCE
        return {
          async request() {
            return getAccountBalance(ethereum, account)
              .then((value) => {
                return value ? JSBI.BigInt(value).toString() : NO_BALANCE
              })
              .catch(() => NO_BALANCE)
          },
          onResult(balance: Balance) {
            if (!cancel && balance !== lastBalance) {
              lastBalance = balance
              onUpdate(balance)
            }
          },
        }
      },
      pollBalanceInterval
    )

    // start polling balance every x time
    const stopPollingBalance = pollBalance(account, ethereum, setBalance)

    return () => {
      cancel = true
      stopPollingBalance()
      setBalance(NO_BALANCE)
    }
  }, [account, ethereum, pollBalanceInterval])

  return balance
}
