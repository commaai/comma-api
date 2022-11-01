"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clipsCreate = clipsCreate;
exports.clipsDelete = clipsDelete;
exports.clipsDetails = clipsDetails;
exports.clipsList = clipsList;
exports.clipsUpdate = clipsUpdate;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _request = _interopRequireDefault(require("./request"));
function clipsCreate(_x, _x2, _x3, _x4, _x5, _x6) {
  return _clipsCreate.apply(this, arguments);
}
function _clipsCreate() {
  _clipsCreate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(route, title, start_time, end_time, video_type, is_public) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _request.default.post('v1/clips/create', {
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
function clipsList(_x7) {
  return _clipsList.apply(this, arguments);
}
function _clipsList() {
  _clipsList = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(dongle_id) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _request.default.get('v1/clips/list', {
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
function clipsDetails(_x8, _x9) {
  return _clipsDetails.apply(this, arguments);
}
function _clipsDetails() {
  _clipsDetails = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(dongle_id, clip_id) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _request.default.get('v1/clips/details', {
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
function clipsUpdate(_x10, _x11, _x12) {
  return _clipsUpdate.apply(this, arguments);
}
function _clipsUpdate() {
  _clipsUpdate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(dongle_id, clip_id, is_public) {
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _request.default.patch('v1/clips/update', {
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
function clipsDelete(_x13, _x14) {
  return _clipsDelete.apply(this, arguments);
}
function _clipsDelete() {
  _clipsDelete = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(dongle_id, clip_id) {
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _request.default.delete('v1/clips/update', {
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