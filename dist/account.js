'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProfile = getProfile;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getProfile(dongle_id) {
  var profile = dongle_id || 'me';

  return request.get('v1/' + profile + '/');
}