import ConfigRequest from './instance';
import { BILLING_URL_ROOT } from './config';

let request = new ConfigRequest(BILLING_URL_ROOT);
export function configure(accessToken) {
  request.configure(accessToken);
}

export async function getSubscription(dongleId) {
  return await request.get('v1/prime/subscription', { dongle_id: dongleId });
}

export async function getSubscribeInfo(dongleId) {
  return await request.get('v1/prime/subscribe_info', { dongle_id: dongleId });
}

export async function cancelPrime(dongleId) {
  return await request.post('v1/prime/cancel', { dongle_id: dongleId });
}

export async function getSimValid(dongleId, simId) {
  return await request.get('v1/prime/sim_valid', { dongle_id: dongleId, sim_id: simId });
}

export async function getStripeCheckout(dongleId, simId, plan) {
  return await request.post('v1/prime/stripe_checkout', { dongle_id: dongleId, sim_id: simId, plan: plan });
}

export async function getStripePortal(dongleId) {
  return await request.get('v1/prime/stripe_portal', { dongle_id: dongleId });
}

export async function getStripeSession(dongleId, sessionId) {
  return await request.get('v1/prime/stripe_session', { dongle_id: dongleId, session_id: sessionId });
}
