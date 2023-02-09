import Config from './config'
import ConfigRequest from './instance'

const request = new ConfigRequest(Config.ATHENA_API_URL)

export function configure(accessToken: string) {
  request.configure(accessToken)
}

export async function postJsonRpcPayload(dongleId: string, payload) {
  return request.post(dongleId, payload)
}
