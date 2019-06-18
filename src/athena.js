import ConfigRequest from 'config-request/instance';

import errorHandler from './errorHandler';
import { ATHENA_URL_ROOT } from './config';

const request = ConfigRequest();
var initPromise;
function ensureInit() {
  if (!initPromise) {
    initPromise = configure();
  }
  return initPromise;
}

export function postJsonRpcPayload(dongleId, payload) {
  return post(dongleId, payload);
}

export async function configure(accessToken) {
  const config = {
    baseUrl: ATHENA_URL_ROOT,
    jwt: false,
    parse: null,
  };

  if (accessToken) {
    config.token = `JWT ${accessToken}`;
  }

  request.configure(config);
}

export async function post(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.post(
      endpoint,
      {
        body: data,
        json: true
      },
      errorHandler(resolve, reject)
    );
  });
}
