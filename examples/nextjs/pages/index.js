import React, { useState } from 'react'
import { utils as ethersUtils } from 'ethers'
import {
  RejectedActivationError,
  UseWalletProvider,
  useWallet,
} from 'use-wallet'

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
            <button onClick={() => activate('walletconnect')}>walletconnect</button>
            <button onClick={() => activate('walletlink')}>walletlink</button>
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
              : `${ethersUtils.formatEther(wallet.balance)} ETH`}
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

function HomePage() {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        fortmatic: { apiKey: '' },
        portis: { dAppId: '' },
        walletconnect: { rpcUrl: 'wss://mainnet.eth.aragon.network/ws' },
        walletlink: { url: 'wss://mainnet.eth.aragon.network/ws' },
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
    </UseWalletProvider>
  )
}

export default HomePage
