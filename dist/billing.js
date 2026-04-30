import Config from './config';
import ConfigRequest from './instance';
const request = new ConfigRequest(Config.BILLING_URL_ROOT);
export function configure(accessToken) {
  let errorResponseCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  request.configure(accessToken, errorResponseCallback);
}
export async function getSubscription(dongle_id) {
  return request.get('v1/prime/subscription', {
    dongle_id
  });
}
export async function getSubscribeInfo(dongle_id) {
  return request.get('v1/prime/subscribe_info', {
    dongle_id
  });
}
export async function cancelPrime(dongle_id) {
  return request.post('v1/prime/cancel', {
    dongle_id
  });
}
export async function getStripeCheckout(dongle_id, sim_id, plan) {
  return request.post('v1/prime/stripe_checkout', {
    dongle_id,
    sim_id,
    plan
  });
}
export async function getStripePortal(dongle_id) {
  return request.get('v1/prime/stripe_portal', {
    dongle_id
  });
}
export async function getStripeSession(dongle_id, session_id) {
  return request.get('v1/prime/stripe_session', {
    dongle_id,
    session_id
  });
}