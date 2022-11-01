"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clips = exports.billing = exports.auth = exports.athena = exports.account = void 0;
Object.defineProperty(exports, "derived", {
  enumerable: true,
  get: function get() {
    return _derived.default;
  }
});
exports.raw = exports.navigation = exports.drives = exports.devices = void 0;
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function get() {
    return _request.default;
  }
});
exports.video = void 0;
var account = _interopRequireWildcard(require("./account"));
exports.account = account;
var athena = _interopRequireWildcard(require("./athena"));
exports.athena = athena;
var auth = _interopRequireWildcard(require("./auth"));
exports.auth = auth;
var billing = _interopRequireWildcard(require("./billing"));
exports.billing = billing;
var clips = _interopRequireWildcard(require("./clips"));
exports.clips = clips;
var devices = _interopRequireWildcard(require("./devices"));
exports.devices = devices;
var _derived = _interopRequireDefault(require("./derived"));
var drives = _interopRequireWildcard(require("./drives"));
exports.drives = drives;
var raw = _interopRequireWildcard(require("./raw"));
exports.raw = raw;
var _request = _interopRequireDefault(require("./request"));
var navigation = _interopRequireWildcard(require("./navigation"));
exports.navigation = navigation;
var video = _interopRequireWildcard(require("./video"));
exports.video = video;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }