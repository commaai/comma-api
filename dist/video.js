'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = videoApi;

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function videoApi(routeSigUrl) {
  var storageRequest = new _instance2.default(routeSigUrl);

  return {
    getQcameraStreamIndexUrl: function getQcameraStreamIndexUrl() {
      return routeSigUrl + '/qcamera.m3u8';
    },
    getQcameraStreamIndex: function getQcameraStreamIndex() {
      return storageRequest.get('qcamera.m3u8', null, false, false);
    }
  };
}