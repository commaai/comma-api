'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listDevices = listDevices;
exports.setDeviceAlias = setDeviceAlias;
exports.setDeviceVehicleId = setDeviceVehicleId;
exports.grantDeviceReadPermission = grantDeviceReadPermission;
exports.removeDeviceReadPermission = removeDeviceReadPermission;
exports.fetchLocation = fetchLocation;
exports.fetchVehicles = fetchVehicles;
exports.fetchDevice = fetchDevice;
exports.pilotPair = pilotPair;
exports.fetchDeviceStats = fetchDeviceStats;
exports.unpair = unpair;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function listDevices() {
  return request.get('v1/me/devices/');
} // Devices API
// ~~~~~~~~~~~

function setDeviceAlias(dongle_id, alias) {
  return request.patch('v1/devices/' + dongle_id + '/', { alias });
}

function setDeviceVehicleId(dongle_id, vehicle_id) {
  return request.patch('v1/devices/' + dongle_id + '/', { vehicle_id });
}

function grantDeviceReadPermission(dongle_id, email) {
  return request.post('v1/devices/' + dongle_id + '/add_user', { email });
}

function removeDeviceReadPermission(dongle_id, email) {
  return request.post('v1/devices/' + dongle_id + '/del_user', { email });
}

async function fetchLocation(dongleId) {
  const locationEndpoint = 'v1/devices/' + dongleId + '/location';
  const location = await request.get(locationEndpoint);
  if (location !== undefined && location.error === undefined) {
    return location;
  } else {
    throw Error("Could not fetch device location: " + JSON.stringify(location));
  }
}

function fetchVehicles(vehicleId) {
  const vehicleEndpoint = 'v1/vehicles/' + vehicleId;
  return request.get(vehicleEndpoint);
}

function fetchDevice(dongleId) {
  const deviceEndpoint = 'v1/devices/' + dongleId + '/';
  return request.get(deviceEndpoint);
}

function pilotPair(imei, serial) {
  return request.postForm('v1/pilotpair/', { imei, serial });
}

function fetchDeviceStats(dongleId) {
  return request.get('v1/devices/' + dongleId + '/stats');
}

function unpair(dongleId) {
  return request.post('v1/devices/' + dongleId + '/unpair');
}