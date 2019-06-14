'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConfigRequestPromise;

var _instance = require('config-request/instance');

var _instance2 = _interopRequireDefault(_instance);

var _errorHandler = require('./errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfigRequestPromise() {
  const cr = (0, _instance2.default)();
  let origGet = cr.get,
      origPost = cr.post,
      origPatch = cr.patch;

  cr.get = wrap(cr.get.bind(cr));
  cr.post = wrap(cr.post.bind(cr));
  cr.patch = wrap(cr.patch.bind(cr));

  return cr;
}

let wrap = function (requestFunc) {
  return function (path, options) {
    return new Promise(function (resolve, reject) {
      requestFunc(path, options || {}, (0, _errorHandler2.default)(resolve, reject));
    });
  };
};