'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = videoApi;

var _configRequestPromise = require('./config-request-promise');

var _configRequestPromise2 = _interopRequireDefault(_configRequestPromise);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function videoApi(routeSigUrl, videoServerHost) {
  if (!videoServerHost) {
    videoServerHost = _config.VIDEO_URL_ROOT;
  }
  let [dongleId, routeSignature] = routeSigUrl.split().slice(5, 7);

  const request = (0, _configRequestPromise2.default)();
  request.configure({
    baseUrl: videoServerHost + '/hls/' + dongleId + '/' + routeSignature + '/',
    parse: null
  });

  return {
    getRearCameraStreamIndex: function () {
      return request.get('index.m3u8');
    },
    getFrontCameraStreamIndex: function () {
      return request.get('dcamera/index.m3u8');
    }
  };
}