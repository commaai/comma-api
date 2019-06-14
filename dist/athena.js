'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postJsonRpcPayload = postJsonRpcPayload;
exports.configure = configure;
exports.post = post;

var _instance = require('config-request/instance');

var _instance2 = _interopRequireDefault(_instance);

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

function postJsonRpcPayload(dongleId, payload) {
  return post(dongleId, payload);
}

async function configure(accessToken) {
  const config = {
    baseUrl: _config.ATHENA_URL_ROOT,
    jwt: false,
    parse: null
  };

  if (accessToken) {
    config.token = `JWT ${accessToken}`;
  }

  request.configure(config);
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