// Vehicle API
// ~~~~~~~~~~~

import * as request from './request';

const VEHICLE_MAKES_ENDPOINT = 'vehicles/makes/';

export async function fetchMakes() {
  const makes = await request.get(VEHICLE_MAKES_ENDPOINT);

  if (makes !== undefined) {
    return makes;
  } else {
    throw new Error('error fetching vehicles');
  }
}

export async function fetchModels(make) {
  const models = await request.get(`${ VEHICLE_MAKES_ENDPOINT + make }`);
  if (models !== undefined) {
    return models;
  } else {
    throw new Error('error fetching vehicle models');
  }
}
