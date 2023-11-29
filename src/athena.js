import Config from './config';
import ConfigRequest from './instance';


const request = new ConfigRequest(Config.ATHENA_URL_ROOT);

export function configure(accessToken, errorResponseHandler = null) {
  request.configure(accessToken, errorResponseHandler);
}

export async function postJsonRpcPayload(dongleId, payload) {
  return request.post(dongleId, payload);
}
