import qs from 'query-string';
import request from './request';


// TODO: investigate whether to use IndexedDB or localStorage
const urlStore = {};

async function getCached(endpoint, params, nocache) {
  let url = endpoint;
  if (params !== undefined) {
    url += `?${qs.stringify(params)}`;
  }

  // don't bother bouncing because the URLs themselves expire
  // our expiry time is from initial fetch time, not most recent access
  if (urlStore[url] && !nocache) {
    return urlStore[url];
  }

  urlStore[url] = await request.get(url);

  setTimeout(() => {
    delete urlStore[url];
  }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m

  return urlStore[url];
}

export function getRouteFiles(routeName, nocache = false, params = undefined) {
  return getCached(`v1/route/${routeName}/files`, params, nocache);
}

export function getLogUrls(routeName, params) {
  return getCached(`v1/route/${routeName}/log_urls`, params);
}

export function getUploadUrl(dongleId, path, expiry) {
  return getCached(`v1.4/${dongleId}/upload_url/`, { path, expiry_days: expiry });
}

export async function getUploadUrls(dongleId, paths, expiry) {
  return request.post(`v1/${dongleId}/upload_urls/`, { paths, expiry_days: expiry });
}
