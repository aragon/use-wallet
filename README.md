# 👛 useWallet()

[<img src="https://img.shields.io/npm/v/use-wallet" alt="" />](https://www.npmjs.com/package/use-wallet) [<img src="https://img.shields.io/bundlephobia/minzip/use-wallet" alt="" />](https://bundlephobia.com/result?p=use-wallet)

useWallet() allows dapp users to connect to the provider of their choice in a way that is as straightforward as possible. It provides a common data structure for any connected account, no matter what provider has been chosen by the user. It aims to provide some features that are often reimplemented by dapp developers: connecting to a wallet, keeping track of transactions, and more (submit a [issue](https://github.com/aragon/use-wallet/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) or PR!).

## Features

- All-in-one solution to connect to Ethereum providers.
- Completely library agnostic (use Web3.js, ethers.js, …).
- Provides the current balance.
- Keeps track of the recent transactions (coming soon).

### Opinionated?

Oh yes:

- React only.
- Ethereum only (for now).
- Supports one network at a time.
- Embeds as many providers as possible.
- Every prop and parameter is optional.

### What useWallet() is not

- An Ethereum wallet implementation.
- A low-level, fully configurable connection system for Ethereum providers (see [web3-react](https://github.com/NoahZinsmeister/web3-react) if you are after that).
- An general library to interact with Ethereum (see ethers.js, Web3.js, etc.).

### Used by

- [Aragon client](https://github.com/aragon/aragon)
- [Aragon's Court Dashboard](https://github.com/aragon/court-dashboard)
- _(Your project!)_

## Usage

Add it to your project:

```console
yarn add use-wallet
```

Use it in your React app:

```jsx
// App.js

import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'

function App() {
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()

  return (
    <>
      <h1>Wallet</h1>
      {wallet.status === 'connected' ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>Balance: {wallet.balance}</div>
          <button onClick={() => wallet.reset()}>disconnect</button>
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={() => wallet.connect()}>MetaMask</button>
          <button onClick={() => wallet.connect('frame')}>Frame</button>
          <button onClick={() => wallet.connect('portis')}>Portis</button>
        </div>
      )}
    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider
    chainId={1}
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: 'my-dapp-id-123-xyz' },
    }}
  >
    <App />
  </UseWalletProvider>
)
```

## API

### &lt;UseWalletProvider />

This is the provider component. It should be placed above any component using `useWallet()`. Apart from `children`, it accepts two other props:

#### chainId

The [Chain ID](https://chainid.network/) supported by the connection. Defaults to 1.

#### connectors

Configuration for the different connectors. If you use a connector that requires a configuration but do not provide one, an error will be thrown.

- `injected`: no configuration needed.
- `frame`: no configuration needed.
- `fortmatic`: `{ apiKey }`
- `portis`: `{ dAppId }`
- `provided`: `{ provider }`
- `authereum`: no configuration needed.
- `squarelink`: `{ clientId, options }`
- `walletconnect`: `{ rpcUrl }`
- `walletlink`: `{ url, appName, appLogoUrl }`

See the [web3-react documentation](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs) for more details.

### useWallet()

This is the hook to be used throughout the app.

It takes an optional object as a single param, containing the following:

- `pollBalanceInterval`: the interval used to poll the wallet balance. Defaults to 2000.
- `pollBlockNumberInterval`: the interval used to poll the block number. Defaults to 5000.

It returns an object representing the connected account (“wallet”), containing:

- `account`: the address of the account, or `null` when disconnected.
- `balance`: the balance of the account, in wei.
- `chainId`: The specified Chain ID of the network you're connected to.
- `connect(connectorId)`: call this function with a connector ID to “connect” to a provider (see above for the connectors provided by default).
- `connector`: The "key" of the wallet you're connected to (e.g "metamask", "portis").
- `connectors`: the full list of connectors.
- `error`: contains an error object with the corresponding name and message if `status` is set to `error`.
- `ethereum`: the connected [Ethereum provider](https://eips.ethereum.org/EIPS/eip-1193).
- `getBlockNumber()`: this function returns the current block number. This is a function because the block number updates often, which could trigger as many extra renders. Making an explicit call for the block number allows users of `useWallet()` to avoid extra renders when the block number is not needed.
- `networkName`: a human-readable name corresponding to the Chain ID.
- `reset()`: call this function to “disconnect” from the current provider. This will also clean the latest error value stored in `use-wallet`'s state.
- `status`: contains the current status of the wallet connection. The possible values are:
  - "disconnected": no wallet connected (default state).
  - "connecting": trying to connect to the wallet.
  - "connected": connected to the wallet (i.e. the account is available).
  - "error": a connection error happened.
- `type`: whether or not the account is a contract. Can be `null` when you're disconnected, or either `"contract"` or `"normal"`.

## Special thanks

useWallet() is a built on [web3-react](https://github.com/NoahZinsmeister/web3-react) and its connectors, which are doing all the hard work internally.
