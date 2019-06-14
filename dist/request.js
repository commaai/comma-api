'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.postForm = exports.post = exports.get = exports.configure = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var configure = exports.configure = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(accessToken) {
    var config;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = {
              baseUrl: _config.COMMA_URL_ROOT,
              jwt: false,
              parse: null
            };


            if (accessToken) {
              config.token = 'JWT ' + accessToken;
            }

            request.configure(config);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function configure(_x) {
    return _ref.apply(this, arguments);
  };
}();

var get = exports.get = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(endpoint, data) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return ensureInit();

          case 2:
            return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
              request.get(endpoint, {
                query: data,
                json: true
              }, (0, _errorHandler2.default)(resolve, reject));
            }));

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function get(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var post = exports.post = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(endpoint, data) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return ensureInit();

          case 2:
            return _context3.abrupt('return', new _promise2.default(function (resolve, reject) {
              request.post(endpoint, {
                body: data,
                json: true
              }, (0, _errorHandler2.default)(resolve, reject));
            }));

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function post(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var postForm = exports.postForm = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(endpoint, data) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return ensureInit();

          case 2:
            return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {
              request.post(endpoint, {
                body: _querystringify2.default.stringify(data),
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }, (0, _errorHandler2.default)(resolve, reject));
            }));

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function postForm(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var patch = exports.patch = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(endpoint, data) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return ensureInit();

          case 2:
            return _context5.abrupt('return', new _promise2.default(function (resolve, reject) {
              request.patch(endpoint, {
                body: data,
                json: true
              }, (0, _errorHandler2.default)(resolve, reject));
            }));

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function patch(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var _instance = require('config-request/instance');

var _instance2 = _interopRequireDefault(_instance);

var _querystringify = require('querystringify');

var _querystringify2 = _interopRequireDefault(_querystringify);

var _errorHandler = require('./errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = (0, _instance2.default)();

var initPromise;
function ensureInit() {
  if (!initPromise) {
    initPromise = configure();
  }
  return initPromise;
}