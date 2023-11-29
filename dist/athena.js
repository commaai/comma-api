import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import Config from './config';
import ConfigRequest from './instance';
var request = new ConfigRequest(Config.ATHENA_URL_ROOT);
export function configure(accessToken) {
  var errorResponseCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  request.configure(accessToken, errorResponseCallback);
}
export function postJsonRpcPayload(_x, _x2) {
  return _postJsonRpcPayload.apply(this, arguments);
}
function _postJsonRpcPayload() {
  _postJsonRpcPayload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(dongleId, payload) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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