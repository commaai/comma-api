import qs from 'query-string';
import * as request from './request';

const urlStore = {};
export function getRouteFiles (routeName) {
  return getCached('files', routeName);
}

export function getLogUrls (routeName, params) {
  return getCached('log_urls', routeName, params);
}

async function getCached (endpoint, routeName, params) {
  // don't bother bouncing because the URLs themselves expire
  // our expiry time is from initial fetch time, not most recent access
  if (urlStore[routeName]) {
    return urlStore[routeName];
  }
  var path = 'v1/route/' + routeName + '/' + endpoint;
  if (params !== undefined) {
    path += '?' + qs.stringify(params);
  }
  var data = await request.get(path);

  urlStore[routeName] = data;

  setTimeout(function() {
    delete urlStore[routeName];
  }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m

  return urlStore[routeName];
}
