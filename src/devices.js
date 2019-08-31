// Devices API
// ~~~~~~~~~~~

import * as request from './request';

export function listDevices () {
  return request.get('v1/me/devices/');
}

export function setDeviceAlias (dongle_id, alias) {
  return request.patch('v1/devices/' + dongle_id + '/', { alias });
}

export function setDeviceVehicleId (dongle_id, vehicle_id) {
  return request.patch('v1/devices/' + dongle_id + '/', { vehicle_id });
}

export function grantDeviceReadPermission (dongle_id, email) {
  return request.post('v1/devices/' + dongle_id + '/add_user', { email });
}

export function removeDeviceReadPermission (dongle_id, email) {
  return request.post('v1/devices/' + dongle_id + '/del_user', { email });
}

export async function fetchLocation(dongleId) {
  const locationEndpoint = 'v1/devices/' + dongleId + '/location';
  const location = await request.get(locationEndpoint);
  if (location !== undefined && location.error === undefined) {
    return location;
  } else {
    throw Error("Could not fetch device location: " + JSON.stringify(location));
  }
}

export function fetchVehicles(vehicleId) {
  const vehicleEndpoint = 'v1/vehicles/' + vehicleId;
  return request.get(vehicleEndpoint);
}

export function fetchDevice(dongleId) {
  const deviceEndpoint = 'v1.1/devices/' + dongleId + '/';
  return request.get(deviceEndpoint);
}

export function pilotPair(imei, serial, pairToken) {
  return request.postForm('v2/pilotpair/', { imei, serial, pair_token: pairToken });
}

export function fetchDeviceStats(dongleId) {
  return request.get('v1/devices/' + dongleId + '/stats');
}

export function unpair(dongleId) {
  return request.post('v1/devices/' + dongleId + '/unpair');
}
