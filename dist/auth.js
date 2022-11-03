import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import request from './request';
export function refreshAccessToken(_x, _x2) {
  return _refreshAccessToken.apply(this, arguments);
}
function _refreshAccessToken() {
  _refreshAccessToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(code, provider) {
    var resp;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request.postForm('v2/auth/', {
              code: code,
              provider: provider
            });
          case 2:
            resp = _context.sent;
            if (!(resp.access_token != null)) {
              _context.next = 6;
              break;
            }
            request.configure(resp.access_token);
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