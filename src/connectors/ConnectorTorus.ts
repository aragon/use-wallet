import { Connector } from '../types'

export default async function init(): Promise<Connector> {
  const { TorusConnector } = await import('@web3-react/torus-connector')
  return {
    web3ReactConnector({
      chainId,
      initOptions,
      constructorOptions,
    }: {
      chainId: number
      initOptions: any
      constructorOptions: any
    }) {
      return new TorusConnector({ chainId, constructorOptions, initOptions })
    },
  }
}
