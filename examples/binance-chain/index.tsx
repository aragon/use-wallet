import React from 'react'
import { render } from 'react-dom'
import {
  BinanceBscConnector,
  UserRejectedRequestError,
} from '@binance-chain/bsc-connector'
import { ConnectionRejectedError, UseWalletProvider } from 'use-wallet'

function App() {
  return (
    <div>
      <h1>Binance Chain Connector</h1>
      <button>Connect</button>
    </div>
  )
}

render(
  <UseWalletProvider
    connectors={{
      bsc: {
        web3ReactConnector() {
          return new BinanceBscConnector({ supportedChainIds: [56, 97] })
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
