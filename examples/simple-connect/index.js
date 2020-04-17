import 'babel-polyfill'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import * as ethers from 'ethers'
import {
  RejectedActivationError,
  UseWalletProvider,
  useWallet,
} from 'use-wallet'

const { providers: EthersProviders, utils, EtherSymbol } = ethers

function App() {
  const [lastError, setLastError] = useState('')
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()

  const activate = async connector => {
    setLastError('')

    try {
      await wallet.activate(connector)
    } catch (err) {
      if (err instanceof RejectedActivationError) {
        setLastError('Connection error: the user rejected the activation')
      }
      setLastError(err.message)
    }
  }

  return (
    <>
      <h1>use-wallet</h1>

      {(() => {
        if (lastError) {
          return (
            <p>
              <span>{lastError}</span>
              <button onClick={() => setLastError('')}>retry</button>
            </p>
          )
        }

        if (wallet.activating) {
          return (
            <p>
              <span>Connecting to {wallet.activating}…</span>
              <button onClick={() => wallet.deactivate()}>cancel</button>
            </p>
          )
        }

        if (wallet.connected) {
          return (
            <p>
              <span>Connected.</span>
              <button onClick={() => wallet.deactivate()}>disconnect</button>
            </p>
          )
        }

        return (
          <p>
            <span>Connect:</span>
            <button onClick={() => activate('injected')}>injected</button>
            <button onClick={() => activate('frame')}>frame</button>
            <button onClick={() => activate('portis')}>portis</button>
            <button onClick={() => activate('fortmatic')}>fortmatic</button>
            <button onClick={() => activate('torus')}>torus</button>
          </p>
        )
      })()}

      {wallet.connected && (
        <>
          <p>
            <span>Account:</span>
            <span>{wallet.account}</span>
          </p>
        </>
      )}

      {wallet.account && (
        <p>
          <span>Balance:</span>
          <span>
            {wallet.balance === '-1'
              ? '…'
              : `${utils.formatEther(wallet.balance)} ETH`}
          </span>
        </p>
      )}

      {wallet.connected && (
        <p>
          <span>Block:</span> <span>{blockNumber || '…'}</span>
        </p>
      )}
    </>
  )
}

ReactDOM.render(
  <UseWalletProvider
    chainId={1}
    connectors={{
      fortmatic: { apiKey: '' },
      portis: { dAppId: '' },
    }}
  >
    <App />
    <style>
      {`
        body {
          width: 40rem;
          margin: 0 auto;
          font-family: sans-serif;
          font-size: 18px;
          line-height: 1.5;
        }
        button {
          width: 6rem;
        }
        h1 {
          font-weight: 400;
        }
        p {
          display: grid;
          justify-content: space-between;
          align-items: center;
          grid-auto-flow: column;
          gap: 1rem;
          align-items: center;
          margin: 2rem 0;
        }
        button {
          width: 7rem;
          height: 3rem;
          cursor: pointer;
          font-size: 1rem;
          padding: 0;
        }
      `}
    </style>
  </UseWalletProvider>,
  document.querySelector('#app')
)
