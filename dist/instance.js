import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _createClass from "@babel/runtime/helpers/createClass";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _wrapNativeSuper from "@babel/runtime/helpers/wrapNativeSuper";
import _regeneratorRuntime from "@babel/runtime/regenerator";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
import qs from 'query-string';
export var RequestError = /*#__PURE__*/function (_Error) {
  _inherits(RequestError, _Error);
  var _super = _createSuper(RequestError);
  function RequestError(resp) {
    var _this;
    _classCallCheck(this, RequestError);
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(params));
    _this.resp = resp;
    return _this;
  }
  return _createClass(RequestError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var ConfigRequest = /*#__PURE__*/function () {
  function ConfigRequest(baseUrl) {
    _classCallCheck(this, ConfigRequest);
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
    this.baseUrl = baseUrl + (!baseUrl.endsWith('/') ? '/' : '');
    this.errorResponseHandler = null;
  }
  _createClass(ConfigRequest, [{
    key: "configure",
    value: function configure(accessToken) {
      var errorResponseHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (accessToken) {
        this.defaultHeaders.Authorization = "JWT ".concat(accessToken);
      }
      if (errorResponseHandler) {
        this.errorResponseHandler = errorResponseHandler;
      }
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(method, endpoint, params) {
        var dataJson,
          respJson,
          headers,
          requestUrl,
          body,
          resp,
          error,
          _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dataJson = _args.length > 3 && _args[3] !== undefined ? _args[3] : true;
                respJson = _args.length > 4 && _args[4] !== undefined ? _args[4] : true;
                headers = _objectSpread({}, this.defaultHeaders);
                if (!dataJson) {
                  headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
                requestUrl = this.baseUrl + endpoint;
                if (params && Object.keys(params).length !== 0) {
                  if (method === 'GET' || method === 'HEAD') {
                    requestUrl += "?".concat(qs.stringify(params));
                  } else if (dataJson) {
                    body = JSON.stringify(params);
                  } else {
                    body = qs.stringify(params);
                  }
                }
                _context.next = 8;
                return fetch(requestUrl, {
                  method: method,
                  headers: headers,
                  body: body
                });
              case 8:
                resp = _context.sent;
                if (resp.ok) {
                  _context.next = 18;
                  break;
                }
                if (!this.errorResponseHandler) {
                  _context.next = 14;
                  break;
                }
                _context.next = 13;
                return this.errorResponseHandler(resp);
              case 13:
                return _context.abrupt("return", null);
              case 14:
                _context.next = 16;
                return resp.text();
              case 16:
                error = _context.sent;
                throw new RequestError(resp, "".concat(resp.status, ": ").concat(error));
              case 18:
                if (respJson) {
                  _context.next = 20;
                  break;
                }
                return _context.abrupt("return", resp);
              case 20:
                return _context.abrupt("return", resp.json());
              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function request(_x, _x2, _x3) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(endpoint, params) {
        var dataJson,
          respJson,
          _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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
      function get(_x4, _x5) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "head",
    value: function () {
      var _head = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(endpoint, params) {
        var dataJson,
          respJson,
          _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
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
      function head(_x6, _x7) {
        return _head.apply(this, arguments);
      }
      return head;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(endpoint, params) {
        var dataJson,
          respJson,
          _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
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
      function post(_x8, _x9) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "postForm",
    value: function () {
      var _postForm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(endpoint, params) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
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
      function postForm(_x10, _x11) {
        return _postForm.apply(this, arguments);
      }
      return postForm;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(endpoint, params) {
        var dataJson,
          respJson,
          _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
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
      function put(_x12, _x13) {
        return _put.apply(this, arguments);
      }
      return put;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(endpoint, params) {
        var dataJson,
          respJson,
          _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
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
      function _delete(_x14, _x15) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "patch",
    value: function () {
      var _patch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(endpoint, params) {
        var dataJson,
          respJson,
          _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
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
      function patch(_x16, _x17) {
        return _patch.apply(this, arguments);
      }
      return patch;
    }()
  }]);
  return ConfigRequest;
}();
export { ConfigRequest as default };