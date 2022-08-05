'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUploadUrls = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getUploadUrls = exports.getUploadUrls = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dongleId, paths, expiry) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request.post('v1/' + dongleId + '/upload_urls/', {
              paths: paths,
              expiry_days: expiry
            });

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getUploadUrls(_x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var getCached = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(endpoint, params, nocache) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // don't bother bouncing because the URLs themselves expire
            // our expiry time is from initial fetch time, not most recent access
            if (params !== undefined) {
              endpoint += '?' + _queryString2.default.stringify(params);
            }

            if (!(urlStore[endpoint] && !nocache)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', urlStore[endpoint]);

          case 3:
            _context2.next = 5;
            return request.get(endpoint);

          case 5:
            urlStore[endpoint] = _context2.sent;


            setTimeout(function () {
              delete urlStore[endpoint];
            }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m

            return _context2.abrupt('return', urlStore[endpoint]);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getCached(_x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getRouteFiles = getRouteFiles;
exports.getLogUrls = getLogUrls;
exports.getUploadUrl = getUploadUrl;

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlStore = {};
function getRouteFiles(routeName) {
  var nocache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  return getCached('v1/route/' + routeName + '/files', params, nocache);
}

function getLogUrls(routeName, params) {
  return getCached('v1/route/' + routeName + '/log_urls', params);
}

function getUploadUrl(dongleId, path, expiry) {
  return getCached('v1.4/' + dongleId + '/upload_url/', {
    path: path,
    expiry_days: expiry
  });
}