'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMakes = fetchMakes;
exports.fetchModels = fetchModels;
exports.fetchVehicle = fetchVehicle;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function fetchMakes() {
  return request.get('v1/vehicles/makes/');
} // Vehicle API
// ~~~~~~~~~~~

function fetchModels(make) {
  return request.get('v1/vehicles/makes/' + make);
}

function fetchVehicle(vehicleId) {
  return request.get('v1/vehicles/' + vehicleId.toString());
}