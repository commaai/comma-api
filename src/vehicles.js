// Vehicle API
// ~~~~~~~~~~~

import * as request from './request';

export async function fetchMakes() {
  return request.get('vehicles/makes/');
}

export async function fetchModels(make) {
  return request.get('vehicles/makes/' + make);
}

export async function fetchVehicle(vehicleId) {
  return request.get('vehicles/' + vehicleId.toString());
}
