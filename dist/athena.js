'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postJsonRpcPayload = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var postJsonRpcPayload = exports.postJsonRpcPayload = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dongleId, payload) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request.post(dongleId, payload);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function postJsonRpcPayload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.configure = configure;

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = new _instance2.default(_config.ATHENA_URL_ROOT);
function configure(accessToken) {
  request.configure(accessToken);
}