import request from './request'

export function setDestination(dongleId: string, latitude, longitude, place_name: string, place_details: string) {
  return request.post(`v1/navigation/${dongleId}/set_destination`, {
    latitude,
    longitude,
    place_name,
    place_details,
  })
}

export function getLocationsData(dongleId: string) {
  return request.get(`v1/navigation/${dongleId}/locations`)
}

export function putLocationSave(
  dongleId: string,
  latitude: number,
  longitude: number,
  place_name: string,
  place_details: string,
  save_type?: 'favorite' | 'recent',
  label?: string,
) {
  return request.put(`v1/navigation/${dongleId}/locations`, {
    latitude,
    longitude,
    place_name,
    place_details,
    save_type,
    label,
  })
}

export function patchLocationSave(dongleId: string, navLocationId: number, saveType: 'favorite' | 'recent', label?: string) {
  return request.patch(`v1/navigation/${dongleId}/locations`, {
    id: navLocationId,
    save_type: saveType,
    label,
  })
}

export function deleteLocationSave(dongleId: string, navLocationId: number) {
  return request.delete(`v1/navigation/${dongleId}/locations`, { id: navLocationId })
}

export function getLocationsNext(dongleId: string) {
  return request.get(`v1/navigation/${dongleId}/next`)
}
