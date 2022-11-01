"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogUrls = getLogUrls;
exports.getRouteFiles = getRouteFiles;
exports.getUploadUrl = getUploadUrl;
exports.getUploadUrls = getUploadUrls;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _queryString = _interopRequireDefault(require("query-string"));
var _request = _interopRequireDefault(require("./request"));
// TODO: investigate whether to use IndexedDB or localStorage
var urlStore = {};
function getCached(_x, _x2, _x3) {
  return _getCached.apply(this, arguments);
}
function _getCached() {
  _getCached = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(endpoint, params, nocache) {
    var url;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = endpoint;
            if (params !== undefined) {
              url += "?".concat(_queryString.default.stringify(params));
            }

            // don't bother bouncing because the URLs themselves expire
            // our expiry time is from initial fetch time, not most recent access
            if (!(urlStore[url] && !nocache)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", urlStore[url]);
          case 4:
            _context.next = 6;
            return _request.default.get(url);
          case 6:
            urlStore[url] = _context.sent;
            setTimeout(function () {
              delete urlStore[url];
            }, 1000 * 60 * 45); // expires in 1h, lets reset in 45m
            return _context.abrupt("return", urlStore[url]);
          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getCached.apply(this, arguments);
}
function getRouteFiles(routeName) {
  var nocache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return getCached("v1/route/".concat(routeName, "/files"), params, nocache);
}
function getLogUrls(routeName, params) {
  return getCached("v1/route/".concat(routeName, "/log_urls"), params);
}
function getUploadUrl(dongleId, path, expiry) {
  return getCached("v1.4/".concat(dongleId, "/upload_url/"), {
    path: path,
    expiry_days: expiry
  });
}
function getUploadUrls(_x4, _x5, _x6) {
  return _getUploadUrls.apply(this, arguments);
}
function _getUploadUrls() {
  _getUploadUrls = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(dongleId, paths, expiry) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _request.default.post("v1/".concat(dongleId, "/upload_urls/"), {
              paths: paths,
              expiry_days: expiry
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getUploadUrls.apply(this, arguments);
}