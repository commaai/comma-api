'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelPrime = exports.updatePaymentMethod = exports.getPaymentMethod = exports.payForPrime = exports.getSubscription = exports.configure = undefined;

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
              baseUrl: _config.BILLING_URL_ROOT,
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

var get = function () {
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

var post = function () {
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

var getSubscription = exports.getSubscription = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dongleId) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', get('v1/prime/subscription', { dongle_id: dongleId }));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getSubscription(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

var payForPrime = exports.payForPrime = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dongleId, simId, stripeToken) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', post('v1/prime/pay', { dongle_id: dongleId, sim_id: simId, stripe_token: stripeToken }));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function payForPrime(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var getPaymentMethod = exports.getPaymentMethod = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', get('v1/prime/payment_source'));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getPaymentMethod() {
    return _ref6.apply(this, arguments);
  };
}();

var updatePaymentMethod = exports.updatePaymentMethod = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(stripe_token) {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', post('v1/prime/payment_source', { stripe_token: stripe_token }));

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function updatePaymentMethod(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

var cancelPrime = exports.cancelPrime = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(dongleId) {
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt('return', post('v1/prime/cancel', { dongle_id: dongleId }));

          case 1:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function cancelPrime(_x11) {
    return _ref8.apply(this, arguments);
  };
}();

var _instance = require('config-request/instance');

var _instance2 = _interopRequireDefault(_instance);

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