// Vehicle API
// ~~~~~~~~~~~

import * as request from './request';

export function fetchMakes() {
  return request.get('v1/vehicles/makes/');
}

export function fetchModels(make) {
  return request.get('v1/vehicles/makes/' + make);
}

export function fetchVehicle(vehicleId) {
  return request.get('v1/vehicles/' + vehicleId.toString());
}
