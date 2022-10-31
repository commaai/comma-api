// Devices API
// ~~~~~~~~~~~

import * as request from './request';

export function listDevices() {
  return request.get('v1/me/devices/');
}

export function setDeviceAlias(dongleId, alias) {
  return request.patch(`v1/devices/${dongleId}/`, { alias });
}

export function setDeviceVehicleId(dongleId, vehicle_id) {
  return request.patch(`v1/devices/${dongleId}/`, { vehicle_id });
}

export function grantDeviceReadPermission(dongleId, email) {
  return request.post(`v1/devices/${dongleId}/add_user`, { email });
}

export function removeDeviceReadPermission(dongleId, email) {
  return request.post(`v1/devices/${dongleId}/del_user`, { email });
}

export async function fetchLocation(dongleId) {
  const locationEndpoint = `v1/devices/${dongleId}/location`;
  const location = await request.get(locationEndpoint);
  if (location !== undefined && location.error === undefined) {
    return location;
  }
  throw Error(`Could not fetch device location: ${JSON.stringify(location)}`);
}

export function fetchVehicles(vehicleId) {
  const vehicleEndpoint = `v1/vehicles/${vehicleId}`;
  return request.get(vehicleEndpoint);
}

export function fetchDevice(dongleId) {
  const deviceEndpoint = `v1.1/devices/${dongleId}/`;
  return request.get(deviceEndpoint);
}

export function pilotPair(pair_token) {
  return request.postForm('v2/pilotpair/', { pair_token });
}

export function fetchDeviceStats(dongleId) {
  return request.get(`v1.1/devices/${dongleId}/stats`);
}

export function unpair(dongleId) {
  return request.post(`v1/devices/${dongleId}/unpair`);
}

export function fetchDeviceOwner(dongleId) {
  return request.get(`v1/devices/${dongleId}/owner`);
}

export function getAthenaQueue(dongleId) {
  return request.get(`v1/devices/${dongleId}/athena_offline_queue`);
}
