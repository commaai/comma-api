import Config from './config'
import ConfigRequest from './instance'

const request = new ConfigRequest(Config.BILLING_API_URL)

export function configure(accessToken: string) {
  request.setAuthorization(accessToken)
}

export async function getSubscription(dongle_id: string) {
  return request.get('v1/prime/subscription', { dongle_id })
}

export async function getSubscribeInfo(dongle_id: string) {
  return request.get('v1/prime/subscribe_info', { dongle_id })
}

export async function cancelPrime(dongle_id: string) {
  return request.post('v1/prime/cancel', { dongle_id })
}

export async function getSimValid(dongle_id: string, sim_id: string) {
  return request.get('v1/prime/sim_valid', { dongle_id, sim_id })
}

export async function getStripeCheckout(dongle_id: string, sim_id: string, plan: string) {
  return request.post('v1/prime/stripe_checkout', { dongle_id, sim_id, plan })
}

export async function getStripePortal(dongle_id: string) {
  return request.get('v1/prime/stripe_portal', { dongle_id })
}

export async function getStripeSession(dongle_id: string, session_id: string) {
  return request.get('v1/prime/stripe_session', { dongle_id, session_id })
}
