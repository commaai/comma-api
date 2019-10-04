'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLocation = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fetchLocation = exports.fetchLocation = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dongleId) {
    var locationEndpoint, location;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            locationEndpoint = 'v1/devices/' + dongleId + '/location';
            _context.next = 3;
            return request.get(locationEndpoint);

          case 3:
            location = _context.sent;

            if (!(location !== undefined && location.error === undefined)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', location);

          case 8:
            throw Error("Could not fetch device location: " + (0, _stringify2.default)(location));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchLocation(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.listDevices = listDevices;
exports.setDeviceAlias = setDeviceAlias;
exports.setDeviceVehicleId = setDeviceVehicleId;
exports.grantDeviceReadPermission = grantDeviceReadPermission;
exports.removeDeviceReadPermission = removeDeviceReadPermission;
exports.fetchVehicles = fetchVehicles;
exports.fetchDevice = fetchDevice;
exports.pilotPair = pilotPair;
exports.fetchDeviceStats = fetchDeviceStats;
exports.unpair = unpair;
exports.fetchDeviceOwner = fetchDeviceOwner;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listDevices() {
  return request.get('v1/me/devices/');
} // Devices API
// ~~~~~~~~~~~

function setDeviceAlias(dongle_id, alias) {
  return request.patch('v1/devices/' + dongle_id + '/', { alias: alias });
}

function setDeviceVehicleId(dongle_id, vehicle_id) {
  return request.patch('v1/devices/' + dongle_id + '/', { vehicle_id: vehicle_id });
}

function grantDeviceReadPermission(dongle_id, email) {
  return request.post('v1/devices/' + dongle_id + '/add_user', { email: email });
}

function removeDeviceReadPermission(dongle_id, email) {
  return request.post('v1/devices/' + dongle_id + '/del_user', { email: email });
}

function fetchVehicles(vehicleId) {
  var vehicleEndpoint = 'v1/vehicles/' + vehicleId;
  return request.get(vehicleEndpoint);
}

function fetchDevice(dongleId) {
  var deviceEndpoint = 'v1.1/devices/' + dongleId + '/';
  return request.get(deviceEndpoint);
}

function pilotPair(imei, serial, pairToken) {
  return request.postForm('v2/pilotpair/', { imei: imei, serial: serial, pair_token: pairToken });
}

function fetchDeviceStats(dongleId) {
  return request.get('v1.1/devices/' + dongleId + '/stats');
}

function unpair(dongleId) {
  return request.post('v1/devices/' + dongleId + '/unpair');
}

function fetchDeviceOwner(dongleId) {
  return request.get('v1/devices/' + dongleId + '/owner');
}