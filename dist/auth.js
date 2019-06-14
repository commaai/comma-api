'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshAccessToken = refreshAccessToken;
exports.refreshCommaUser = refreshCommaUser;
exports.commaTokenExchange = commaTokenExchange;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const AUTH_ENDPOINT = 'v1/auth/';
const USER_ENDPOINT = 'v1/me/';

async function refreshAccessToken(idToken) {
  const authResponseText = await request.postForm(AUTH_ENDPOINT, { id_token: idToken });
  const resp = JSON.parse(authResponseText);
  if (resp !== undefined) {
    if (resp.access_token != null) {
      await request.configure(resp.access_token);
      return resp.access_token;
    } else if (resp.response !== undefined) {
      throw new Error('Could not exchange idToken for access token: response ' + resp.response.status);
    }
  }
  throw new Error('Could not exchange idToken for access token: response undefined.');
}

async function refreshCommaUser(accessToken) {
  const commaUser = await request.get(USER_ENDPOINT);
  if (commaUser.success !== false) {
    commaUser.accessToken = accessToken;
    return commaUser;
  } else {
    throw new Error('Failed to fetch comma user: ' + JSON.stringify(commaUser));
  }
}

function commaTokenExchange(accessToken, idToken) {
  return request.postForm("auth/", {
    access_token: accessToken,
    id_token: idToken
  });
}