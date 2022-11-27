import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import request from './request';
export function clipsCreate(_x, _x2, _x3, _x4, _x5, _x6) {
  return _clipsCreate.apply(this, arguments);
}
function _clipsCreate() {
  _clipsCreate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(route, title, start_time, end_time, video_type, is_public) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", request.post('v1/clips/create', {
              route: route,
              title: title,
              start_time: start_time,
              end_time: end_time,
              video_type: video_type,
              is_public: is_public
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _clipsCreate.apply(this, arguments);
}
export function clipsList(_x7) {
  return _clipsList.apply(this, arguments);
}
function _clipsList() {
  _clipsList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(dongle_id) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", request.get('v1/clips/list', {
              dongle_id: dongle_id
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _clipsList.apply(this, arguments);
}
export function clipsDetails(_x8, _x9) {
  return _clipsDetails.apply(this, arguments);
}
function _clipsDetails() {
  _clipsDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(dongle_id, clip_id) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", request.get('v1/clips/details', {
              dongle_id: dongle_id,
              clip_id: clip_id
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _clipsDetails.apply(this, arguments);
}
export function clipsUpdate(_x10, _x11, _x12) {
  return _clipsUpdate.apply(this, arguments);
}
function _clipsUpdate() {
  _clipsUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(dongle_id, clip_id, is_public) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", request.patch('v1/clips/update', {
              dongle_id: dongle_id,
              clip_id: clip_id,
              is_public: is_public
            }));
          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _clipsUpdate.apply(this, arguments);
}
export function clipsDelete(_x13, _x14) {
  return _clipsDelete.apply(this, arguments);
}
function _clipsDelete() {
  _clipsDelete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(dongle_id, clip_id) {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", request.delete('v1/clips/update', {
              dongle_id: dongle_id,
              clip_id: clip_id
            }));
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _clipsDelete.apply(this, arguments);
}