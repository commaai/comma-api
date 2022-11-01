"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteLocationSave = deleteLocationSave;
exports.getLocationsData = getLocationsData;
exports.getLocationsNext = getLocationsNext;
exports.patchLocationSave = patchLocationSave;
exports.putLocationSave = putLocationSave;
exports.setDestination = setDestination;
var _request = _interopRequireDefault(require("./request"));
function setDestination(dongleId, latitude, longitude, place_name, place_details) {
  return _request.default.post("v1/navigation/".concat(dongleId, "/set_destination"), {
    latitude: latitude,
    longitude: longitude,
    place_name: place_name,
    place_details: place_details
  });
}
function getLocationsData(dongleId) {
  return _request.default.get("v1/navigation/".concat(dongleId, "/locations"));
}
function putLocationSave(dongleId, latitude, longitude, place_name, place_details, save_type, label) {
  return _request.default.put("v1/navigation/".concat(dongleId, "/locations"), {
    latitude: latitude,
    longitude: longitude,
    place_name: place_name,
    place_details: place_details,
    save_type: save_type,
    label: label
  });
}
function patchLocationSave(dongleId, navLocationId, saveType, label) {
  return _request.default.patch("v1/navigation/".concat(dongleId, "/locations"), {
    id: navLocationId,
    save_type: saveType,
    label: label
  });
}
function deleteLocationSave(dongleId, navLocationId) {
  return _request.default.del("v1/navigation/".concat(dongleId, "/locations"), {
    id: navLocationId
  });
}
function getLocationsNext(dongleId) {
  return _request.default.get("v1/navigation/".concat(dongleId, "/next"));
}