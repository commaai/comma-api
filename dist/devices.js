import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import request from './request';
export function listDevices() {
  return request.get('v1/me/devices/');
}
export function setDeviceAlias(dongleId, alias) {
  return request.patch("v1/devices/".concat(dongleId, "/"), {
    alias: alias
  });
}
export function setDeviceVehicleId(dongleId, vehicle_id) {
  return request.patch("v1/devices/".concat(dongleId, "/"), {
    vehicle_id: vehicle_id
  });
}
export function grantDeviceReadPermission(dongleId, email) {
  return request.post("v1/devices/".concat(dongleId, "/add_user"), {
    email: email
  });
}
export function removeDeviceReadPermission(dongleId, email) {
  return request.post("v1/devices/".concat(dongleId, "/del_user"), {
    email: email
  });
}
export function fetchLocation(_x) {
  return _fetchLocation.apply(this, arguments);
}
function _fetchLocation() {
  _fetchLocation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(dongleId) {
    var locationEndpoint, location;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            locationEndpoint = "v1/devices/".concat(dongleId, "/location");
            _context.next = 3;
            return request.get(locationEndpoint);
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
export function fetchVehicles(vehicleId) {
  var vehicleEndpoint = "v1/vehicles/".concat(vehicleId);
  return request.get(vehicleEndpoint);
}
export function fetchDevice(dongleId) {
  var deviceEndpoint = "v1.1/devices/".concat(dongleId, "/");
  return request.get(deviceEndpoint);
}
export function pilotPair(pair_token) {
  return request.postForm('v2/pilotpair/', {
    pair_token: pair_token
  });
}
export function fetchDeviceStats(dongleId) {
  return request.get("v1.1/devices/".concat(dongleId, "/stats"));
}
export function unpair(dongleId) {
  return request.post("v1/devices/".concat(dongleId, "/unpair"));
}
export function fetchDeviceOwner(dongleId) {
  return request.get("v1/devices/".concat(dongleId, "/owner"));
}
export function getAthenaQueue(dongleId) {
  return request.get("v1/devices/".concat(dongleId, "/athena_offline_queue"));
}