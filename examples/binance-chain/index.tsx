import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import {
  BscConnector,
  UserRejectedRequestError,
} from '@binance-chain/bsc-connector'
import {
  ConnectionRejectedError,
  useWallet,
  UseWalletProvider,
} from 'use-wallet'

function App() {
  const wallet = useWallet()
  const [address, setAddress] = useState('')

  useEffect(() => {
    console.log(address)
  }, [address])

  return (
    <div>
      <h1>Binance Chain Connector</h1>
      <button onClick={() => { wallet.connect('injected'); setAddress(wallet.account)}}>Connect</button>
    </div>
  )
}

render(
  <UseWalletProvider
    connectors={{
      injected: {
        web3ReactConnector() {
          return new BscConnector({ supportedChainIds: [56, 97] })
        },
        handleActivationError(err) {
          if (err instanceof UserRejectedRequestError) {
            return new ConnectionRejectedError()
          }
        },
      },
    }}
  >
    <App />
  </UseWalletProvider>,
  document.getElementById('root')
)
