'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getCached = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(endpoint, routeName, params) {
    var path, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!urlStore[routeName]) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', urlStore[routeName]);

          case 2:
            path = 'v1/route/' + routeName + '/' + endpoint;

            if (params !== undefined) {
              path += '?' + _querystringify2.default.stringify(params);
            }
            _context.next = 6;
            return request.get(path);

          case 6:
            data = _context.sent;


            urlStore[routeName] = data;

            setTimeout(function () {
              delete urlStore[routeName];
            }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m

            return _context.abrupt('return', urlStore[routeName]);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCached(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getRouteFiles = getRouteFiles;
exports.getLogUrls = getLogUrls;

var _querystringify = require('querystringify');

var _querystringify2 = _interopRequireDefault(_querystringify);

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlStore = {};
function getRouteFiles(routeName) {
  return getCached('files', routeName);
}

function getLogUrls(routeName, params) {
  return getCached('log_urls', routeName, params);
}