import request from './request';
export function getProfile() {
  var dongleId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'me';
  return request.get("v1/".concat(dongleId, "/"));
}