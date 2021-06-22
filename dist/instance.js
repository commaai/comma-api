'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _builtinStatusCodes = require('builtin-status-codes');

var _builtinStatusCodes2 = _interopRequireDefault(_builtinStatusCodes);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('xhr-request');

module.exports = Client;

var methods = ['get', 'post', 'put', 'patch', 'head', 'delete'];

var defaultConfig = {
  baseUrl: 'http://localhost:8000',
  jwt: false,
  token: null,
  options: {}
};

function Client(config) {
  config = (0, _extends3.default)({}, defaultConfig, config ? config : {});

  Request.configure = configure;
  Request.config = config;

  return httpMethods(Request);

  function Request(path, options, callback) {
    path = path || '';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = (0, _extends3.default)({}, config.options, options);
    setQuery(options);
    setToken(options);
    var url = config.baseUrl + (!url.endsWith('/') && !path.startsWith('/')) ? '/' : '' + path;

    return request(url, options, responseHandler(callback, {
      url: url,
      method: options.method
    }));
  }

  function setToken(options) {
    if (!options.token && !config.token) {
      return;
    }

    options.headers = options.headers || {};
    var keyName = options.authorization || config.authorization || 'Authorization';
    var token = options.token || config.token;

    if (options.jwt || config.jwt) {
      token = 'Bearer ' + token;
    }

    options.headers[keyName] = token;
    delete options.token;
  }

  function responseHandler(callback, options) {
    return function (err, data, response) {
      if (err) {
        return callback(err, null, response);
      }

      if (response.statusCode < 200 || response.statusCode >= 400) {
        return createError(data, response, function (err) {
          return callback(err, null, response);
        });
      }

      var parse = options.parse || config.parse;
      data = typeof parse === 'function' ? parse(data, response) : data;
      callback(null, data, response);
    };
  }

  function configure(_config) {
    (0, _assign2.default)(config, _config);
  }
}

function setQuery(options) {
  var query = options.query;
  if (query) {
    options.query = typeof query === 'string' ? query : _queryString2.default.stringify(query);
  };
}

function createError(data, response, callback) {
  var error = _builtinStatusCodes2.default[response.statusCode];
  if (!data) {
    return callback(error);
  }

  if (Array.isArray(data)) {
    data = data[0];
  }

  if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
    return callback((0, _assign2.default)(error, data));
  }

  try {
    var json = JSON.parse(data);
    return callback((0, _assign2.default)(error, json));
  } catch (err) {
    return callback(err.message);
  }
}

function httpMethods(request) {
  methods.forEach(function (method) {
    request[method] = function (path, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      options.method = method;

      return request(path, options, callback);
    };
  });

  return request;
}