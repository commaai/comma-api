// Navigation API
// ~~~~~~~~~~~

import * as request from './request';

export function setDestination(dongle_id, latitude, longitude, place_name, place_details) {
  return request.post('v1/navigation/' + dongle_id + '/set_destination', {
    latitude,
    longitude,
    place_name,
    place_details,
  });
}

export function getLocationsData(dongle_id) {
  return request.get('v1/navigation/' + dongle_id + '/locations');
}

export function putLocationSave(dongle_id, latitude, longitude, place_name, place_details, save_type, label) {
  return request.put('v1/navigation/' + dongle_id + '/locations', {
    latitude,
    longitude,
    place_name,
    place_details,
    save_type,
    label,
  });
}

export function patchLocationSave(dongle_id, nav_location_id, save_type, label) {
  return request.patch('v1/navigation/' + dongle_id + '/locations', {
    id: nav_location_id,
    save_type,
    label,
  });
}

export function deleteLocationSave(dongle_id, nav_location_id) {
  return request.del('v1/navigation/' + dongle_id + '/locations', {
    id: nav_location_id,
  });
}

export function getLocationsNext(dongle_id) {
  return request.get('v1/navigation/' + dongle_id + '/next');
}
