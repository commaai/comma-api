import ConfigRequest from './instance';
import errorHandler from './errorHandler';

import { BILLING_URL_ROOT } from './config';

const request = ConfigRequest();
var initPromise;
function ensureInit() {
  if (!initPromise) {
    initPromise = configure();
  }
  return initPromise;
}

export async function configure(accessToken) {
  const config = {
    baseUrl: BILLING_URL_ROOT,
    jwt: false,
    parse: null,
  };

  if (accessToken) {
    config.token = `JWT ${accessToken}`;
  }

  request.configure(config);
}

async function get(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.get(
      endpoint,
      {
        query: data,
        json: true
      },
      errorHandler(resolve, reject)
    );
  });
}

async function post(endpoint, data) {
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

export async function getSubscription(dongleId) {
  return get('v1/prime/subscription', { dongle_id: dongleId });
}

export async function payForPrime(dongleId, simId, stripeToken) {
  return post('v1/prime/pay', { dongle_id: dongleId, sim_id: simId, stripe_token: stripeToken });
}

export async function getPaymentMethod() {
  return get('v1/prime/payment_source');
}

export async function updatePaymentMethod(stripe_token) {
  return post('v1/prime/payment_source', { stripe_token });
}

export async function cancelPrime(dongleId) {
  return post('v1/prime/cancel', { dongle_id: dongleId });
}
