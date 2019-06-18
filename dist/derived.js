'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = routeApi;

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _configRequestPromise = require('./config-request-promise');

var _configRequestPromise2 = _interopRequireDefault(_configRequestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routeApi(routeSigUrl) {
  var request = (0, _configRequestPromise2.default)();
  var baseUrl = routeSigUrl + '/';
  request.configure({
    baseUrl: baseUrl,
    parse: null
  });

  return {
    getCoords: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var coords;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return request.get('route.coords');

              case 2:
                coords = _context.sent;
                return _context.abrupt('return', JSON.parse(coords));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCoords() {
        return _ref.apply(this, arguments);
      }

      return getCoords;
    }(),
    getJpegUrl: function getJpegUrl(routeOffsetSeconds) {
      return (0, _urlJoin2.default)(baseUrl, 'sec' + routeOffsetSeconds.toString() + '.jpg');
    }
  };
}