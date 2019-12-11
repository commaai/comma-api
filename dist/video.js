'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = videoApi;

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _configRequestPromise = require('./config-request-promise');

var _configRequestPromise2 = _interopRequireDefault(_configRequestPromise);

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

  var videoserverRequest = (0, _configRequestPromise2.default)();
  var videoserverBaseUrl = videoServerHost + '/hls/' + dongleId + '/' + routeSignature + '/';
  videoserverRequest.configure({
    baseUrl: videoserverBaseUrl,
    parse: null
  });
  var storageRequest = (0, _configRequestPromise2.default)();
  storageRequest.configure({
    baseUrl: routeSigUrl + '/',
    parse: null
  });

  return {
    getRearCameraStreamIndexUrl: function getRearCameraStreamIndexUrl() {
      return (0, _urlJoin2.default)(videoserverBaseUrl, 'index.m3u8');
    },
    getFrontCameraStreamIndexUrl: function getFrontCameraStreamIndexUrl() {
      return (0, _urlJoin2.default)(videoserverBaseUrl, 'dcamera/index.m3u8');
    },
    getQcameraStreamIndexUrl: function getQcameraStreamIndexUrl() {
      return (0, _urlJoin2.default)(routeSigUrl, 'qcamera.m3u8');
    },
    getRearCameraStreamIndex: function getRearCameraStreamIndex() {
      return videoserverRequest.get('index.m3u8');
    },
    getFrontCameraStreamIndexPath: function getFrontCameraStreamIndexPath() {
      return videoserverRequest.get('dcamera/index.m3u8');
    },
    getQcameraStreamIndex: function getQcameraStreamIndex(max) {
      return storageRequest.get('qcamera.m3u8');
    }
  };
}