'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(method, path, params, use_json) {
        var requestUrl, headers, body, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (use_json !== false) {
                  use_json = true;
                }

                requestUrl = this.baseUrl + path;
                headers = (0, _extends3.default)({}, this.defaultHeaders);
                body = undefined;

                if (method === 'get' || method === 'head') {
                  requestUrl += '?' + _queryString2.default.stringify(params);
                } else if (use_json) {
                  body = (0, _stringify2.default)(params);
                } else {
                  headers['Content-Type'] = 'application/x-www-form-urlencoded';
                  body = _queryString2.default.stringify(params);
                }

                _context.next = 7;
                return fetch(requestUrl, { method: method, headers: headers, body: body });

              case 7:
                resp = _context.sent;
                _context.next = 10;
                return resp.json();

              case 10:
                return _context.abrupt('return', _context.sent);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return request;
    }()
  }]);
  return ConfigRequest;
}();

exports.default = ConfigRequest;


['get', 'post', 'put', 'patch', 'head', 'delete'].forEach(function (method) {
  ConfigRequest.prototype[method] = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path, params, use_json) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.request(method, path, params, use_json);

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x5, _x6, _x7) {
      return _ref2.apply(this, arguments);
    };
  }();
});