'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getCached = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(endpoint, params, nocache) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // don't bother bouncing because the URLs themselves expire
            // our expiry time is from initial fetch time, not most recent access
            if (params !== undefined) {
              endpoint += '?' + _queryString2.default.stringify(params);
            }

            if (!(urlStore[endpoint] && !nocache)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', urlStore[endpoint]);

          case 3:
            _context.next = 5;
            return request.get(endpoint);

          case 5:
            urlStore[endpoint] = _context.sent;


            setTimeout(function () {
              delete urlStore[endpoint];
            }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m

            return _context.abrupt('return', urlStore[endpoint]);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCached(_x2, _x3, _x4) {
    return _ref.apply(this, arguments);
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

  return getCached('v1/route/' + routeName + '/files', undefined, nocache);
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