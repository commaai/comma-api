'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var COMMA_URL_ROOT = exports.COMMA_URL_ROOT = 'https://api.comma.ai/';
if (typeof window !== 'undefined' && window.COMMA_URL_ROOT) {
  exports.COMMA_URL_ROOT = COMMA_URL_ROOT = window.COMMA_URL_ROOT;
}

var ATHENA_URL_ROOT = exports.ATHENA_URL_ROOT = 'https://athena.comma.ai/';
if (typeof window !== 'undefined' && window.ATHENA_URL_ROOT) {
  exports.ATHENA_URL_ROOT = ATHENA_URL_ROOT = window.ATHENA_URL_ROOT;
}

var BILLING_URL_ROOT = exports.BILLING_URL_ROOT = 'https://billing.comma.ai/';
if (typeof window !== 'undefined' && window.BILLING_URL_ROOT) {
  exports.BILLING_URL_ROOT = BILLING_URL_ROOT = window.BILLING_URL_ROOT;
}