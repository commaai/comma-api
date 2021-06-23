import ConfigRequest from './instance';
import { ATHENA_URL_ROOT } from './config';

let request = new ConfigRequest(ATHENA_URL_ROOT);
export function configure(accessToken) {
  request.configure(accessToken);
}

export async function postJsonRpcPayload(dongleId, payload) {
  return await request.post(dongleId, payload);
}
