import Config from './config';
import ConfigRequest from './instance';
const request = new ConfigRequest(Config.ATHENA_URL_ROOT);
export function configure(accessToken) {
  let errorResponseCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  request.configure(accessToken, errorResponseCallback);
}
export async function postJsonRpcPayload(dongleId, payload) {
  return request.post(dongleId, payload);
}