"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RequestError = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _queryString = _interopRequireDefault(require("query-string"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RequestError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(RequestError, _Error);
  var _super = _createSuper(RequestError);
  function RequestError(resp) {
    var _this;
    (0, _classCallCheck2.default)(this, RequestError);
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(params));
    _this.resp = resp;
    return _this;
  }
  return (0, _createClass2.default)(RequestError);
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
exports.RequestError = RequestError;
var ConfigRequest = /*#__PURE__*/function () {
  function ConfigRequest(baseUrl) {
    (0, _classCallCheck2.default)(this, ConfigRequest);
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
    this.baseUrl = baseUrl + (!baseUrl.endsWith('/') ? '/' : '');
  }
  (0, _createClass2.default)(ConfigRequest, [{
    key: "configure",
    value: function configure(accessToken) {
      if (accessToken) {
        this.defaultHeaders.Authorization = "JWT ".concat(accessToken);
      }
    }
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(method, endpoint, params, dataJson, respJson) {
        var headers, requestUrl, body, resp, error;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                headers = _objectSpread({}, this.defaultHeaders);
                if (!dataJson) {
                  headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
                requestUrl = this.baseUrl + endpoint;
                if (params && Object.keys(params).length !== 0) {
                  if (method === 'GET' || method === 'HEAD') {
                    requestUrl += "?".concat(_queryString.default.stringify(params));
                  } else if (dataJson) {
                    body = JSON.stringify(params);
                  } else {
                    body = _queryString.default.stringify(params);
                  }
                }
                _context.next = 6;
                return fetch(requestUrl, {
                  method: method,
                  headers: headers,
                  body: body
                });
              case 6:
                resp = _context.sent;
                if (resp.ok) {
                  _context.next = 12;
                  break;
                }
                _context.next = 10;
                return resp.text();
              case 10:
                error = _context.sent;
                throw new RequestError(resp, "".concat(resp.status, ": ").concat(error));
              case 12:
                if (respJson) {
                  _context.next = 14;
                  break;
                }
                return _context.abrupt("return", resp);
              case 14:
                return _context.abrupt("return", resp.json());
              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function request(_x, _x2, _x3, _x4, _x5) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(endpoint, params) {
        var dataJson,
          respJson,
          _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dataJson = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : true;
                respJson = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : true;
                return _context2.abrupt("return", this.request('GET', endpoint, params, dataJson, respJson));
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function get(_x6, _x7) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "head",
    value: function () {
      var _head = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(endpoint, params) {
        var dataJson,
          respJson,
          _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dataJson = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;
                respJson = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : true;
                return _context3.abrupt("return", this.request('HEAD', endpoint, params, dataJson, respJson));
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function head(_x8, _x9) {
        return _head.apply(this, arguments);
      }
      return head;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(endpoint, params) {
        var dataJson,
          respJson,
          _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dataJson = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : true;
                respJson = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : true;
                return _context4.abrupt("return", this.request('POST', endpoint, params, dataJson, respJson));
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function post(_x10, _x11) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "postForm",
    value: function () {
      var _postForm = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(endpoint, params) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.post(endpoint, params, false));
              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function postForm(_x12, _x13) {
        return _postForm.apply(this, arguments);
      }
      return postForm;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(endpoint, params) {
        var dataJson,
          respJson,
          _args6 = arguments;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                dataJson = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : true;
                respJson = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : true;
                return _context6.abrupt("return", this.request('PUT', endpoint, params, dataJson, respJson));
              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function put(_x14, _x15) {
        return _put.apply(this, arguments);
      }
      return put;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(endpoint, params) {
        var dataJson,
          respJson,
          _args7 = arguments;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                dataJson = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : true;
                respJson = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : true;
                return _context7.abrupt("return", this.request('DELETE', endpoint, params, dataJson, respJson));
              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function _delete(_x16, _x17) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "patch",
    value: function () {
      var _patch = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(endpoint, params) {
        var dataJson,
          respJson,
          _args8 = arguments;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                dataJson = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : true;
                respJson = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : true;
                return _context8.abrupt("return", this.request('PATCH', endpoint, params, dataJson, respJson));
              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function patch(_x18, _x19) {
        return _patch.apply(this, arguments);
      }
      return patch;
    }()
  }]);
  return ConfigRequest;
}();
exports.default = ConfigRequest;