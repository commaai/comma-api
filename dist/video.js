"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQcameraStreamUrl = getQcameraStreamUrl;
var _queryString = _interopRequireDefault(require("query-string"));
var _config = _interopRequireDefault(require("./config"));
var _instance = _interopRequireDefault(require("./instance"));
var request = new _instance.default(_config.default.COMMA_URL_ROOT);
function getQcameraStreamUrl(routeStr, exp, sig) {
  var query = _queryString.default.stringify({
    exp: exp,
    sig: sig
  });
  return "".concat(request.baseUrl, "v1/route/").concat(routeStr, "/qcamera.m3u8?").concat(query);
}