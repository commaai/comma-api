'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = videoApi;

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function videoApi(routeSigUrl, videoServerHost) {
  if (!videoServerHost) {
    videoServerHost = _config.VIDEO_HOST;
  }

  var _routeSigUrl$split$sl = routeSigUrl.split('/').slice(5, 7),
      _routeSigUrl$split$sl2 = (0, _slicedToArray3.default)(_routeSigUrl$split$sl, 2),
      dongleId = _routeSigUrl$split$sl2[0],
      routeSignature = _routeSigUrl$split$sl2[1];

  var videoserverBaseUrl = videoServerHost + '/hls/' + dongleId + '/' + routeSignature;
  var videoserverRequest = new _instance2.default(videoserverBaseUrl);
  var storageRequest = new _instance2.default(routeSigUrl);

  return {
    getRearCameraStreamIndexUrl: function getRearCameraStreamIndexUrl() {
      return videoserverBaseUrl + '/index.m3u8';
    },
    getFrontCameraStreamIndexUrl: function getFrontCameraStreamIndexUrl() {
      return videoserverBaseUrl + '/dcamera/index.m3u8';
    },
    getQcameraStreamIndexUrl: function getQcameraStreamIndexUrl() {
      return routeSigUrl + '/qcamera.m3u8';
    },
    getRearCameraStreamIndex: function getRearCameraStreamIndex() {
      return videoserverRequest.get('index.m3u8', null, false, false);
    },
    getFrontCameraStreamIndexPath: function getFrontCameraStreamIndexPath() {
      return videoserverRequest.get('dcamera/index.m3u8', null, false, false);
    },
    getQcameraStreamIndex: function getQcameraStreamIndex() {
      return storageRequest.get('qcamera.m3u8', null, false, false);
    }
  };
}