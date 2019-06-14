'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRouteFiles = getRouteFiles;
exports.getLogUrls = getLogUrls;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const urlStore = {};
function getRouteFiles(routeName) {
  return getCached('files', routeName);
}

function getLogUrls(routeName) {
  return getCached('log_urls', routeName);
}

async function getCached(endpoint, routeName) {
  // don't bother bouncing because the URLs themselves expire
  // our expiry time is from initial fetch time, not most recent access
  if (urlStore[routeName]) {
    return urlStore[routeName];
  }
  var data = await request.get('v1/route/' + routeName + '/' + endpoint);

  urlStore[routeName] = data;

  setTimeout(function () {
    delete urlStore[routeName];
  }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m

  return urlStore[routeName];
}