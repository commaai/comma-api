'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;
exports.get = get;
exports.post = post;
exports.postForm = postForm;
exports.patch = patch;

var _instance = require('config-request/instance');

var _instance2 = _interopRequireDefault(_instance);

var _querystringify = require('querystringify');

var _querystringify2 = _interopRequireDefault(_querystringify);

var _errorHandler = require('./errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const request = (0, _instance2.default)();

var initPromise;
function ensureInit() {
  if (!initPromise) {
    initPromise = configure();
  }
  return initPromise;
}

async function configure(accessToken) {
  const config = {
    baseUrl: _config.COMMA_URL_ROOT,
    jwt: false,
    parse: null
  };

  if (accessToken) {
    config.token = `JWT ${accessToken}`;
  }

  request.configure(config);
}

async function get(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.get(endpoint, {
      query: data,
      json: true
    }, (0, _errorHandler2.default)(resolve, reject));
  });
}

async function post(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.post(endpoint, {
      body: data,
      json: true
    }, (0, _errorHandler2.default)(resolve, reject));
  });
}

async function postForm(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.post(endpoint, {
      body: _querystringify2.default.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }, (0, _errorHandler2.default)(resolve, reject));
  });
}

async function patch(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.patch(endpoint, {
      body: data,
      json: true
    }, (0, _errorHandler2.default)(resolve, reject));
  });
}