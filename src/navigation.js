// Navigation API
// ~~~~~~~~~~~

import * as request from './request';

export function setDestination(dongleId, latitude, longitude, place_name, place_details) {
  return request.post(`v1/navigation/${dongleId}/set_destination`, {
    latitude,
    longitude,
    place_name,
    place_details,
  });
}

export function getLocationsData(dongleId) {
  return request.get(`v1/navigation/${dongleId}/locations`);
}

export function putLocationSave(
  dongleId,
  latitude,
  longitude,
  place_name,
  place_details,
  save_type,
  label,
) {
  return request.put(`v1/navigation/${dongleId}/locations`, {
    latitude,
    longitude,
    place_name,
    place_details,
    save_type,
    label,
  });
}

export function patchLocationSave(dongleId, navLocationId, saveType, label) {
  return request.patch(`v1/navigation/${dongleId}/locations`, {
    id: navLocationId,
    save_type: saveType,
    label,
  });
}

export function deleteLocationSave(dongleId, navLocationId) {
  return request.del(`v1/navigation/${dongleId}/locations`, { id: navLocationId });
}

export function getLocationsNext(dongleId) {
  return request.get(`v1/navigation/${dongleId}/next`);
}
