var request = require('xhr-request');
var join = require('url-join');
var extend = require('xtend');
var assign = require('xtend/mutable');
var isFunction = require('is-function');
var httpError = require('http-status-error');
var isError = require('is-error-code');
var jsonParse = require('safe-json-parse');
var isObject = require('is-obj');
var Query = require('query-string-flatten');

module.exports = Client;

var methods = ['get', 'post', 'put', 'patch', 'head', 'delete'];

var defaultConfig = {
  baseUrl: 'http://localhost:8000',
  jwt: false,
  token: null,
  options: {}
};

function Client (config) {
  config = config || {};
  config = extend(defaultConfig, config);

  Request.configure = configure;
  Request.config = config;

  return httpMethods(Request);

  function Request (path, options, callback) {
    path = path || '';
    if (isFunction(options)) {
      callback = options;
      options = {};
    }
    options = extend(config.options, options);
    setQuery(options);
    setToken(options);
    var url = join(config.baseUrl, path);

    return request(url, options, responseHandler(callback, {
      url: url,
      method: options.method
    }));
  }

  function setToken (options) {
    if (!options.token && !config.token) { return; }
    options.headers = options.headers || {};
    var keyName = options.authorization || config.authorization || 'Authorization';
    var token = options.token || config.token;

    if (options.jwt || config.jwt) {
      token = 'Bearer ' + token;
    }

    options.headers[keyName] = token;
    delete options.token;
  }

  function responseHandler (callback, options) {
    // var start = new Date()

    return function handleResponse (err, data, response) {
      // var end = new Date()

      if (err) {
        return callback(err, null, response);
      }

      if (isError(response.statusCode)) {
        return createError(data, response, function (err) {
          callback(err, null, response);
        });
      }

      var parse = options.parse || config.parse;
      data = isFunction(parse) ? parse(data, response) : data;
      callback(null, data, response);
    };
  }

  function configure (_config) {
    assign(config, _config);
  }
}

function setQuery (options) {
  var query = options.query;
  if (!query) return;
  options.query = (typeof query === 'string' ? String : Query)(query);
}

function createError (data, response, callback) {
  var error = httpError(response.statusCode);
  if (!data) return callback(error);
  if (data) {
    if (Array.isArray(data)) {
      data = data[0];
    }
    if (isObject(data)) {
      return callback(assign(error, data));
    }
    jsonParse(data, function (err, json) {
      if (err) return callback(err);
      callback(assign(error, json));
    });
  }
}

function httpMethods (request) {
  methods.forEach(function createMethod (method) {
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
