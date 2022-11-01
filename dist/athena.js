"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;
exports.postJsonRpcPayload = postJsonRpcPayload;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("./config"));
var _instance = _interopRequireDefault(require("./instance"));
var request = new _instance.default(_config.default.ATHENA_URL_ROOT);
function configure(accessToken) {
  request.configure(accessToken);
}
function postJsonRpcPayload(_x, _x2) {
  return _postJsonRpcPayload.apply(this, arguments);
}
function _postJsonRpcPayload() {
  _postJsonRpcPayload = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(dongleId, payload) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", request.post(dongleId, payload));
          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _postJsonRpcPayload.apply(this, arguments);
}