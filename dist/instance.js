'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestError = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestError = exports.RequestError = function (_Error) {
  (0, _inherits3.default)(RequestError, _Error);

  function RequestError(resp) {
    var _ref;

    (0, _classCallCheck3.default)(this, RequestError);

    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestError.__proto__ || (0, _getPrototypeOf2.default)(RequestError)).call.apply(_ref, [this].concat(params)));

    _this.resp = resp;
    return _this;
  }

  return RequestError;
}(Error);

var ConfigRequest = function () {
  function ConfigRequest(baseUrl) {
    (0, _classCallCheck3.default)(this, ConfigRequest);

    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
    this.baseUrl = baseUrl + (!baseUrl.endsWith('/') ? '/' : '');
  }

  (0, _createClass3.default)(ConfigRequest, [{
    key: 'configure',
    value: function configure(accessToken) {
      if (accessToken) {
        this.defaultHeaders['Authorization'] = 'JWT ' + accessToken;
      }
    }
  }, {
    key: 'request',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(method, path, params, data_json, resp_json) {
        var headers, requestUrl, body, resp, error;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (data_json !== false) {
                  data_json = true;
                }
                if (resp_json !== false) {
                  resp_json = true;
                }

                headers = (0, _extends3.default)({}, this.defaultHeaders);

                if (!data_json) {
                  headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }

                requestUrl = this.baseUrl + path;
                body = undefined;

                if (params && (0, _keys2.default)(params).length !== 0) {
                  if (method === 'GET' || method === 'HEAD') {
                    requestUrl += '?' + _queryString2.default.stringify(params);
                  } else if (data_json) {
                    body = (0, _stringify2.default)(params);
                  } else {
                    body = _queryString2.default.stringify(params);
                  }
                }

                _context.next = 9;
                return fetch(requestUrl, { method: method, headers: headers, body: body });

              case 9:
                resp = _context.sent;

                if (resp.ok) {
                  _context.next = 15;
                  break;
                }

                _context.next = 13;
                return resp.text();

              case 13:
                error = _context.sent;
                throw new RequestError(resp, resp.status + ': ' + error);

              case 15:
                if (resp_json) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt('return', resp);

              case 17:
                _context.next = 19;
                return resp.json();

              case 19:
                return _context.abrupt('return', _context.sent);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request(_x, _x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return request;
    }()
  }]);
  return ConfigRequest;
}();

exports.default = ConfigRequest;


['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'].forEach(function (method) {
  var methodName = method.toLowerCase();
  ConfigRequest.prototype[methodName] = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path, params, data_json, resp_json) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.request(method, path, params, data_json, resp_json);

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x6, _x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();
});