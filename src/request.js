import ConfigRequest from './request-config';
import { COMMA_URL_ROOT } from './config';

let request = new ConfigRequest(COMMA_URL_ROOT);
export function configure(accessToken) {
  request.configure(accessToken);
}

export async function get(endpoint, data) {
  return await request.get(endpoint, data);
}

export async function post(endpoint, data) {
  return await request.post(endpoint, data);
}

export async function postForm(endpoint, data) {
  return await request.post(endpoint, data, false);
}

export async function patch(endpoint, data) {
  return await request.patch(endpoint, data);
}

export async function put(endpoint, data) {
  return await request.put(endpoint, data);
}

export async function del(endpoint, data) {
  return await request.del(endpoint, data);
}
