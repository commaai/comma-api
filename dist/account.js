"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProfile = getProfile;
var _request = _interopRequireDefault(require("./request"));
function getProfile() {
  var dongleId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'me';
  return _request.default.get("v1/".concat(dongleId, "/"));
}