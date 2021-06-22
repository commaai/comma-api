var request = require('xhr-request');

import statusCodes from 'builtin-status-codes';
import qs from 'query-string';

module.exports = Client;

var methods = ['get', 'post', 'put', 'patch', 'head', 'delete'];

var defaultConfig = {
  baseUrl: 'http://localhost:8000',
  jwt: false,
  token: null,
  options: {}
};

function Client(config) {
  config = {
    ...defaultConfig,
    ...(config ? config : {}),
  };

  Request.configure = configure;
  Request.config = config;

  return httpMethods(Request);

  function Request (path, options, callback) {
    path = path || '';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = {
      ...config.options,
      ...options,
    };
    setQuery(options);
    setToken(options);
    const url = config.baseUrl + (!url.endsWith('/') && !path.startsWith('/')) ?  '/' : '' + path;

    return request(url, options, responseHandler(callback, {
      url: url,
      method: options.method
    }));
  }

  function setToken (options) {
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

  function responseHandler (callback, options) {
    return (err, data, response) => {
      if (err) {
        return callback(err, null, response);
      }

      if (response.statusCode < 200 || response.statusCode >= 400) {
        return createError(data, response, (err) => callback(err, null, response));
      }

      var parse = options.parse || config.parse;
      data = typeof parse === 'function' ? parse(data, response) : data;
      callback(null, data, response);
    };
  }

  function configure(_config) {
    Object.assign(config, _config);
  }
}

function setQuery(options) {
  var query = options.query;
  if (query) {
    options.query = typeof query === 'string' ? query : qs.stringify(query);
  };
}

function createError (data, response, callback) {
  let error = statusCodes[response.statusCode];
  if (!data) {
    return callback(error);
  }

  if (Array.isArray(data)) {
    data = data[0];
  }

  if (typeof data === 'object') {
    return callback(Object.assign(error, data));
  }

  try {
    const json = JSON.parse(data);
    return callback(Object.assign(error, json));
  } catch (err) {
    return callback(err.message);
  }
}

function httpMethods(request) {
  methods.forEach((method) => {
    request[method] = (path, options, callback) => {
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
