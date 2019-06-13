// Devices API
// ~~~~~~~~~~~

import * as request from './request';

const DEVICES_ENDPOINT = 'me/devices/';

export async function listDevices () {
  return request.get('me/devices/');
}

export async function setDeviceAlias (dongle_id, alias) {
  return request.patch('devices/' + dongle_id + '/', { alias });
}

export async function setDeviceVehicleId (dongle_id, vehicle_id) {
  return request.patch('devices/' + dongle_id + '/', { vehicle_id });
}

export async function grantDeviceReadPermission (dongle_id, email) {
  return request.post('devices/' + dongle_id + '/add_user', { email });
}

export async function removeDeviceReadPermission (dongle_id, email) {
  return request.post('devices/' + dongle_id + '/del_user', { email });
}

export async function fetchLocation(dongleId) {
  const locationEndpoint = 'devices/' + dongleId + '/location';
  const location = await request.get(locationEndpoint);
  if (location !== undefined && location.error === undefined) {
    return location;
  } else {
    throw Error("Could not fetch device location: " + JSON.stringify(location));
  }
}

export async function fetchVehicles(vehicleId) {
  const vehicleEndpoint = 'vehicles/' + vehicleId;
  return request.get(vehicleEndpoint);
}

export async function fetchDevice(dongleId) {
  const deviceEndpoint = 'devices/' + dongleId + '/';
  return request.get(deviceEndpoint);
}

export function pilotPair(imei,serial) {
  return request.postForm('pilotpair/', { imei, serial });
}

export function fetchDeviceStats(dongleId) {
  return request.get('devices/' + dongleId + '/stats');
}

export function unpair(dongleId) {
  return request.post('devices/' + dongleId + '/unpair');
}
