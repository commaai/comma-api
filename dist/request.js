"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("./config"));
var _instance = _interopRequireDefault(require("./instance"));
var _default = new _instance.default(_config.default.COMMA_URL_ROOT);
exports.default = _default;