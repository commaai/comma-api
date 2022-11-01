"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routeApi;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _instance = _interopRequireDefault(require("./instance"));
function routeApi(routeSigUrl) {
  var request = new _instance.default(routeSigUrl);
  return {
    getCoords: function () {
      var _getCoords = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var cacheKey,
          _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cacheKey = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
                return _context.abrupt("return", request.get("route.coords?s=".concat(cacheKey)));
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function getCoords() {
        return _getCoords.apply(this, arguments);
      }
      return getCoords;
    }(),
    getJpegUrl: function getJpegUrl(routeOffsetSeconds) {
      return "".concat(routeSigUrl, "/sec/").concat(routeOffsetSeconds.toString(), ".jpg");
    }
  };
}