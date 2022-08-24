'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQcameraStreamUrl = getQcameraStreamUrl;

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _config = require('./config');

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = new _instance2.default(_config.COMMA_URL_ROOT);

function getQcameraStreamUrl(route_str, exp, sig) {
  return request.baseUrl + 'v1/route/' + route_str + '/qcamera.m3u8?' + _queryString2.default.stringify({ exp: exp, sig: sig });
}