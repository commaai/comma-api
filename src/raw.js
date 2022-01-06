import qs from 'query-string';
import * as request from './request';

const urlStore = {};
export function getRouteFiles(routeName, nocache=false) {
  return getCached(`v1/route/${routeName}/files`, undefined, nocache);
}

export function getLogUrls(routeName, params) {
  return getCached(`v1/route/${routeName}/log_urls`, params);
}

export function getUploadUrl(dongleId, path, expiry) {
  return getCached(`v1.4/${dongleId}/upload_url/`, {
    path: path,
    expiry_days: expiry,
  });
}

export async function getUploadUrls(dongleId, paths, expiry) {
  return await request.post(`v1/${dongleId}/upload_urls/`, {
    paths: paths,
    expiry_days: expiry,
  });
}

async function getCached(endpoint, params, nocache) {
  // don't bother bouncing because the URLs themselves expire
  // our expiry time is from initial fetch time, not most recent access
  if (params !== undefined) {
    endpoint += '?' + qs.stringify(params);
  }

  if (urlStore[endpoint] && !nocache) {
    return urlStore[endpoint];
  }

  urlStore[endpoint] = await request.get(endpoint);

  setTimeout(function() {
    delete urlStore[endpoint];
  }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m

  return urlStore[endpoint];
}
