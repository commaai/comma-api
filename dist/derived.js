import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import ConfigRequest from './instance';
export default function routeApi(routeSigUrl) {
  var request = new ConfigRequest(routeSigUrl);
  return {
    getCoords: function () {
      var _getCoords = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var cacheKey,
          _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
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