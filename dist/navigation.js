import request from './request';
export function setDestination(dongleId, latitude, longitude, place_name, place_details) {
  return request.post("v1/navigation/".concat(dongleId, "/set_destination"), {
    latitude: latitude,
    longitude: longitude,
    place_name: place_name,
    place_details: place_details
  });
}
export function getLocationsData(dongleId) {
  return request.get("v1/navigation/".concat(dongleId, "/locations"));
}
export function putLocationSave(dongleId, latitude, longitude, place_name, place_details, save_type, label) {
  return request.put("v1/navigation/".concat(dongleId, "/locations"), {
    latitude: latitude,
    longitude: longitude,
    place_name: place_name,
    place_details: place_details,
    save_type: save_type,
    label: label
  });
}
export function patchLocationSave(dongleId, navLocationId, saveType, label) {
  return request.patch("v1/navigation/".concat(dongleId, "/locations"), {
    id: navLocationId,
    save_type: saveType,
    label: label
  });
}
export function deleteLocationSave(dongleId, navLocationId) {
  return request.delete("v1/navigation/".concat(dongleId, "/locations"), {
    id: navLocationId
  });
}
export function getLocationsNext(dongleId) {
  return request.get("v1/navigation/".concat(dongleId, "/next"));
}