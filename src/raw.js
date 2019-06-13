import * as request from './request';

const urlStore = {};
export async function getRouteFiles (routeName) {
  return getCached('files', routeName);
}

export async function getLogUrls (routeName) {
  return getCached('log_urls', routeName);
}

async function getCached (endpoint, routeName) {
  // don't bother bouncing because the URLs themselves expire
  // our expiry time is from initial fetch time, not most recent access
  if (urlStore[routeName]) {
    return urlStore[routeName];
  }
  var data = await request.get('route/' + routeName + '/' + endpoint);

  urlStore[routeName] = data;

  setTimeout(function() {
    delete urlStore[routeName];
  }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m

  return urlStore[routeName];
}
