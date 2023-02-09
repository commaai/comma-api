import request from './request'


export function listDevices() {
  return request.get('v1/me/devices/')
}

export function setDeviceAlias(dongleId: string, alias: string) {
  return request.patch(`v1/devices/${dongleId}/`, { alias })
}

export function grantDeviceReadPermission(dongleId: string, email: string) {
  return request.post(`v1/devices/${dongleId}/add_user`, { email })
}

export function removeDeviceReadPermission(dongleId: string, email: string) {
  return request.post(`v1/devices/${dongleId}/del_user`, { email })
}

export async function fetchLocation(dongleId: string) {
  const locationEndpoint = `v1/devices/${dongleId}/location`
  const location = await request.get(locationEndpoint)
  if (location !== undefined && location.error === undefined) {
    return location
  }
  throw Error(`Could not fetch device location: ${JSON.stringify(location)}`)
}

export function fetchDevice(dongleId: string) {
  const deviceEndpoint = `v1.1/devices/${dongleId}/`
  return request.get(deviceEndpoint)
}

export function pilotPair(pair_token: string) {
  return request.postForm('v2/pilotpair/', { pair_token })
}

export function fetchDeviceStats(dongleId: string) {
  return request.get(`v1.1/devices/${dongleId}/stats`)
}

export function unpair(dongleId: string) {
  return request.post(`v1/devices/${dongleId}/unpair`)
}

export function fetchDeviceOwner(dongleId: string) {
  return request.get(`v1/devices/${dongleId}/owner`)
}

export function getAthenaQueue(dongleId: string) {
  return request.get(`v1/devices/${dongleId}/athena_offline_queue`)
}
