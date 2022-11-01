"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshAccessToken = refreshAccessToken;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _request = _interopRequireDefault(require("./request"));
function refreshAccessToken(_x, _x2) {
  return _refreshAccessToken.apply(this, arguments);
}
function _refreshAccessToken() {
  _refreshAccessToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(code, provider) {
    var resp;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _request.default.postForm('v2/auth/', {
              code: code,
              provider: provider
            });
          case 2:
            resp = _context.sent;
            if (!(resp.access_token != null)) {
              _context.next = 6;
              break;
            }
            _request.default.configure(resp.access_token);
            return _context.abrupt("return", resp.access_token);
          case 6:
            if (!(resp.response !== undefined)) {
              _context.next = 10;
              break;
            }
            throw new Error("Could not exchange oauth code for access token: response ".concat(resp.response));
          case 10:
            if (!(resp.error !== undefined)) {
              _context.next = 14;
              break;
            }
            throw new Error("Could not exchange oauth code for access token: error ".concat(resp.error));
          case 14:
            throw new Error("Could not exchange oauth code for access token: ".concat(resp));
          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _refreshAccessToken.apply(this, arguments);
}