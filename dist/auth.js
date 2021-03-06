'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshAccessToken = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var refreshAccessToken = exports.refreshAccessToken = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(code, redirect_uri, provider) {
    var resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request.postForm('v2/auth/', { code: code, redirect_uri: redirect_uri, provider: provider });

          case 2:
            resp = _context.sent;

            if (!(resp.access_token != null)) {
              _context.next = 8;
              break;
            }

            request.configure(resp.access_token);
            return _context.abrupt('return', resp.access_token);

          case 8:
            if (!(resp.response !== undefined)) {
              _context.next = 12;
              break;
            }

            throw new Error('Could not exchange oauth code for access token: response ' + resp.response.status);

          case 12:
            throw new Error('Could not exchange oauth code for access token: response ' + authResponseText);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function refreshAccessToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }