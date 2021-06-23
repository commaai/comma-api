import ConfigRequest from './instance';
import { BILLING_URL_ROOT } from './config';

let request = new ConfigRequest(BILLING_URL_ROOT);
export function configure(accessToken) {
  request.configure(accessToken);
}

export async function getSubscription(dongleId) {
  return await request.get('v1/prime/subscription', { dongle_id: dongleId });
}

export async function payForPrime(dongleId, simId, stripeToken) {
  return await request.post('v1/prime/pay', { dongle_id: dongleId, sim_id: simId, stripe_token: stripeToken });
}

export async function getPaymentMethod() {
  return await request.get('v1/prime/payment_source');
}

export async function updatePaymentMethod(stripe_token) {
  return await request.post('v1/prime/payment_source', { stripe_token });
}

export async function cancelPrime(dongleId) {
  return await request.post('v1/prime/cancel', { dongle_id: dongleId });
}
