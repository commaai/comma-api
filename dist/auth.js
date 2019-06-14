'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshCommaUser = exports.refreshAccessToken = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var refreshAccessToken = exports.refreshAccessToken = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(idToken) {
    var authResponseText, resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request.postForm(AUTH_ENDPOINT, { id_token: idToken });

          case 2:
            authResponseText = _context.sent;
            resp = JSON.parse(authResponseText);

            if (!(resp !== undefined)) {
              _context.next = 13;
              break;
            }

            if (!(resp.access_token != null)) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return request.configure(resp.access_token);

          case 8:
            return _context.abrupt('return', resp.access_token);

          case 11:
            if (!(resp.response !== undefined)) {
              _context.next = 13;
              break;
            }

            throw new Error('Could not exchange idToken for access token: response ' + resp.response.status);

          case 13:
            throw new Error('Could not exchange idToken for access token: response undefined.');

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function refreshAccessToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

var refreshCommaUser = exports.refreshCommaUser = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(accessToken) {
    var commaUser;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return request.get(USER_ENDPOINT);

          case 2:
            commaUser = _context2.sent;

            if (!(commaUser.success !== false)) {
              _context2.next = 8;
              break;
            }

            commaUser.accessToken = accessToken;
            return _context2.abrupt('return', commaUser);

          case 8:
            throw new Error('Failed to fetch comma user: ' + (0, _stringify2.default)(commaUser));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function refreshCommaUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.commaTokenExchange = commaTokenExchange;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTH_ENDPOINT = 'v1/auth/';
var USER_ENDPOINT = 'v1/me/';

function commaTokenExchange(accessToken, idToken) {
  return request.postForm("auth/", {
    access_token: accessToken,
    id_token: idToken
  });
}