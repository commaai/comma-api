import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import Config from './config';
import ConfigRequest from './instance';
var request = new ConfigRequest(Config.BILLING_URL_ROOT);
export function configure(accessToken) {
  var errorResponseCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  request.configure(accessToken, errorResponseCallback);
}
export function getSubscription(_x) {
  return _getSubscription.apply(this, arguments);
}
function _getSubscription() {
  _getSubscription = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(dongle_id) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", request.get('v1/prime/subscription', {
              dongle_id: dongle_id
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getSubscription.apply(this, arguments);
}
export function getSubscribeInfo(_x2) {
  return _getSubscribeInfo.apply(this, arguments);
}
function _getSubscribeInfo() {
  _getSubscribeInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(dongle_id) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", request.get('v1/prime/subscribe_info', {
              dongle_id: dongle_id
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getSubscribeInfo.apply(this, arguments);
}
export function cancelPrime(_x3) {
  return _cancelPrime.apply(this, arguments);
}
function _cancelPrime() {
  _cancelPrime = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(dongle_id) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", request.post('v1/prime/cancel', {
              dongle_id: dongle_id
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _cancelPrime.apply(this, arguments);
}
export function getSimValid(_x4, _x5) {
  return _getSimValid.apply(this, arguments);
}
function _getSimValid() {
  _getSimValid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(dongle_id, sim_id) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", request.get('v1/prime/sim_valid', {
              dongle_id: dongle_id,
              sim_id: sim_id
            }));
          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getSimValid.apply(this, arguments);
}
export function getStripeCheckout(_x6, _x7, _x8) {
  return _getStripeCheckout.apply(this, arguments);
}
function _getStripeCheckout() {
  _getStripeCheckout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(dongle_id, sim_id, plan) {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", request.post('v1/prime/stripe_checkout', {
              dongle_id: dongle_id,
              sim_id: sim_id,
              plan: plan
            }));
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getStripeCheckout.apply(this, arguments);
}
export function getStripePortal(_x9) {
  return _getStripePortal.apply(this, arguments);
}
function _getStripePortal() {
  _getStripePortal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(dongle_id) {
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", request.get('v1/prime/stripe_portal', {
              dongle_id: dongle_id
            }));
          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getStripePortal.apply(this, arguments);
}
export function getStripeSession(_x10, _x11) {
  return _getStripeSession.apply(this, arguments);
}
function _getStripeSession() {
  _getStripeSession = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(dongle_id, session_id) {
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", request.get('v1/prime/stripe_session', {
              dongle_id: dongle_id,
              session_id: session_id
            }));
          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getStripeSession.apply(this, arguments);
}