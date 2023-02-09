import request from './request'

// TODO: investigate whether to use IndexedDB or localStorage
const urlStore: Record<string, any> = {}

async function getCached(endpoint: string, params?: Record<string, any>, nocache = false) {
  let url = endpoint
  if (params !== undefined) {
    url += `?${new URLSearchParams(params)}`
  }

  // don't bother bouncing because the URLs themselves expire
  // our expiry time is from initial fetch time, not most recent access
  if (urlStore[url] && !nocache) {
    return urlStore[url]
  }

  urlStore[url] = await request.get(url)

  setTimeout(() => {
    delete urlStore[url]
  }, 1000 * 60 * 45) // expires in 1h, lets reset in 45m

  return urlStore[url]
}

export function getRouteFiles(routeName: string, nocache = false, params = undefined) {
  return getCached(`v1/route/${routeName}/files`, params, nocache)
}

export function getLogUrls(routeName: string, params) {
  return getCached(`v1/route/${routeName}/log_urls`, params)
}

export function getUploadUrl(dongleId: string, path: string, expiry_days?: number) {
  return getCached(`v1.4/${dongleId}/upload_url/`, { path, expiry_days })
}

export async function getUploadUrls(dongleId: string, paths: string[], expiry_days?: number) {
  return request.post(`v1/${dongleId}/upload_urls/`, { paths, expiry_days })
}
