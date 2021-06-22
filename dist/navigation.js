'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDestination = setDestination;
exports.getLocationsData = getLocationsData;
exports.putLocationSave = putLocationSave;
exports.patchLocationSave = patchLocationSave;
exports.deleteLocationSave = deleteLocationSave;
exports.getLocationsNext = getLocationsNext;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setDestination(dongle_id, latitude, longitude, place_name, place_details) {
  return request.post('v1/navigation/' + dongle_id + '/set_destination', {
    latitude: latitude,
    longitude: longitude,
    place_name: place_name,
    place_details: place_details
  });
} // Navigation API
// ~~~~~~~~~~~

function getLocationsData(dongle_id) {
  return request.get('v1/navigation/' + dongle_id + '/locations');
}

function putLocationSave(dongle_id, latitude, longitude, place_name, place_details, save_type, label) {
  return request.put('v1/navigation/' + dongle_id + '/locations', {
    latitude: latitude,
    longitude: longitude,
    place_name: place_name,
    place_details: place_details,
    save_type: save_type,
    label: label
  });
}

function patchLocationSave(dongle_id, nav_location_id, save_type, label) {
  return request.patch('v1/navigation/' + dongle_id + '/locations', {
    id: nav_location_id,
    save_type: save_type,
    label: label
  });
}

function deleteLocationSave(dongle_id, nav_location_id) {
  return request.del('v1/navigation/' + dongle_id + '/locations', {
    id: nav_location_id
  });
}

function getLocationsNext(dongle_id) {
  return request.get('v1/navigation/' + dongle_id + '/next');
}