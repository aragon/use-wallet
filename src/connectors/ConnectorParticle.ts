import 'regenerator-runtime/runtime.js'
import { Connector } from '../types'
import { ParticleConnector, UserRejectedRequestError }  from './Particleconnector'
import { Config } from '@particle-network/auth';
import { ConnectionRejectedError } from '../errors'

export default async function init(): Promise<Connector> {  
  return {
    web3ReactConnector(config : Config) {
      return new ParticleConnector(config)
    },
    handleActivationError(err: Error) {
      return err instanceof UserRejectedRequestError
        ? new ConnectionRejectedError()
        : null
    },
  }
}
