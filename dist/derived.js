'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routeApi;

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _configRequestPromise = require('./config-request-promise');

var _configRequestPromise2 = _interopRequireDefault(_configRequestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routeApi(routeSigUrl) {
  const request = (0, _configRequestPromise2.default)();
  const baseUrl = routeSigUrl + '/';
  request.configure({
    baseUrl,
    parse: null
  });

  return {
    getCoords: async function () {
      const coords = await request.get('route.coords');
      return JSON.parse(coords);
    },
    getJpegUrl: function (routeOffsetSeconds) {
      return (0, _urlJoin2.default)(baseUrl, 'sec' + routeOffsetSeconds.toString() + '.jpg');
    }
  };
}