"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDevice = fetchDevice;
exports.fetchDeviceOwner = fetchDeviceOwner;
exports.fetchDeviceStats = fetchDeviceStats;
exports.fetchLocation = fetchLocation;
exports.fetchVehicles = fetchVehicles;
exports.getAthenaQueue = getAthenaQueue;
exports.grantDeviceReadPermission = grantDeviceReadPermission;
exports.listDevices = listDevices;
exports.pilotPair = pilotPair;
exports.removeDeviceReadPermission = removeDeviceReadPermission;
exports.setDeviceAlias = setDeviceAlias;
exports.setDeviceVehicleId = setDeviceVehicleId;
exports.unpair = unpair;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _request = _interopRequireDefault(require("./request"));
function listDevices() {
  return _request.default.get('v1/me/devices/');
}
function setDeviceAlias(dongleId, alias) {
  return _request.default.patch("v1/devices/".concat(dongleId, "/"), {
    alias: alias
  });
}
function setDeviceVehicleId(dongleId, vehicle_id) {
  return _request.default.patch("v1/devices/".concat(dongleId, "/"), {
    vehicle_id: vehicle_id
  });
}
function grantDeviceReadPermission(dongleId, email) {
  return _request.default.post("v1/devices/".concat(dongleId, "/add_user"), {
    email: email
  });
}
function removeDeviceReadPermission(dongleId, email) {
  return _request.default.post("v1/devices/".concat(dongleId, "/del_user"), {
    email: email
  });
}
function fetchLocation(_x) {
  return _fetchLocation.apply(this, arguments);
}
function _fetchLocation() {
  _fetchLocation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(dongleId) {
    var locationEndpoint, location;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            locationEndpoint = "v1/devices/".concat(dongleId, "/location");
            _context.next = 3;
            return _request.default.get(locationEndpoint);
          case 3:
            location = _context.sent;
            if (!(location !== undefined && location.error === undefined)) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return", location);
          case 6:
            throw Error("Could not fetch device location: ".concat(JSON.stringify(location)));
          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchLocation.apply(this, arguments);
}
function fetchVehicles(vehicleId) {
  var vehicleEndpoint = "v1/vehicles/".concat(vehicleId);
  return _request.default.get(vehicleEndpoint);
}
function fetchDevice(dongleId) {
  var deviceEndpoint = "v1.1/devices/".concat(dongleId, "/");
  return _request.default.get(deviceEndpoint);
}
function pilotPair(pair_token) {
  return _request.default.postForm('v2/pilotpair/', {
    pair_token: pair_token
  });
}
function fetchDeviceStats(dongleId) {
  return _request.default.get("v1.1/devices/".concat(dongleId, "/stats"));
}
function unpair(dongleId) {
  return _request.default.post("v1/devices/".concat(dongleId, "/unpair"));
}
function fetchDeviceOwner(dongleId) {
  return _request.default.get("v1/devices/".concat(dongleId, "/owner"));
}
function getAthenaQueue(dongleId) {
  return _request.default.get("v1/devices/".concat(dongleId, "/athena_offline_queue"));
}