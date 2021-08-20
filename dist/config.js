'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var COMMA_URL_ROOT = exports.COMMA_URL_ROOT = window.COMMA_URL_ROOT;
if (!COMMA_URL_ROOT) {
  exports.COMMA_URL_ROOT = COMMA_URL_ROOT = 'https://api.commadotai.com/';
}

var ATHENA_URL_ROOT = exports.ATHENA_URL_ROOT = window.ATHENA_URL_ROOT;
if (!ATHENA_URL_ROOT) {
  exports.ATHENA_URL_ROOT = ATHENA_URL_ROOT = 'https://athena.comma.ai/';
}

var BILLING_URL_ROOT = exports.BILLING_URL_ROOT = window.BILLING_URL_ROOT;
if (!BILLING_URL_ROOT) {
  exports.BILLING_URL_ROOT = BILLING_URL_ROOT = 'https://billing.comma.ai/';
}

var VIDEO_HOST = exports.VIDEO_HOST = window.COMMA_VIDEO_CDN;
if (!VIDEO_HOST) {
  exports.VIDEO_HOST = VIDEO_HOST = 'https://my-comma-video.azureedge.net';
}