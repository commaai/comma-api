import Config from './config'
import ConfigRequest from './instance'

const request = new ConfigRequest(Config.ATHENA_API_URL)

export function configure(accessToken: string) {
  request.setAuthorization(accessToken)
}

export async function postJsonRpcPayload(dongleId: string, payload: Record<string, any>) {
  return request.post(dongleId, payload)
}
