'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStripeSession = exports.getStripePortal = exports.getStripeCheckout = exports.getSimValid = exports.cancelPrime = exports.getSubscribeInfo = exports.getSubscription = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getSubscription = exports.getSubscription = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dongleId) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request.get('v1/prime/subscription', { dongle_id: dongleId });

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getSubscription(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getSubscribeInfo = exports.getSubscribeInfo = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dongleId) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return request.get('v1/prime/subscribe_info', { dongle_id: dongleId });

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getSubscribeInfo(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var cancelPrime = exports.cancelPrime = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dongleId) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return request.post('v1/prime/cancel', { dongle_id: dongleId });

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function cancelPrime(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getSimValid = exports.getSimValid = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dongleId, simId) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return request.get('v1/prime/sim_valid', { dongle_id: dongleId, sim_id: simId });

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getSimValid(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var getStripeCheckout = exports.getStripeCheckout = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dongleId, simId, plan) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return request.post('v1/prime/stripe_checkout', { dongle_id: dongleId, sim_id: simId, plan: plan });

          case 2:
            return _context5.abrupt('return', _context5.sent);

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getStripeCheckout(_x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

var getStripePortal = exports.getStripePortal = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dongleId) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return request.get('v1/prime/stripe_portal', { dongle_id: dongleId });

          case 2:
            return _context6.abrupt('return', _context6.sent);

          case 3:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getStripePortal(_x9) {
    return _ref6.apply(this, arguments);
  };
}();

var getStripeSession = exports.getStripeSession = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(dongleId, sessionId) {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return request.get('v1/prime/stripe_session', { dongle_id: dongleId, session_id: sessionId });

          case 2:
            return _context7.abrupt('return', _context7.sent);

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getStripeSession(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();

exports.configure = configure;

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = new _instance2.default(_config.BILLING_URL_ROOT);
function configure(accessToken) {
  request.configure(accessToken);
}