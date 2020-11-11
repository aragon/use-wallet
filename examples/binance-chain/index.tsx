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
  const { account, connect, reset, status } = useWallet()
  return (
    <div>
      <h1>Binance Chain Connector</h1>
      {status === 'disconnected' ? (
        <button onClick={() => connect('bsc')}>Connect</button>
      ) : (
        <button onClick={() => reset()}>Disconnect</button>
      )}
      {account && <p>Connected as {account}</p>}
    </div>
  )
}

render(
  <UseWalletProvider
    connectors={{
      bsc: {
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
