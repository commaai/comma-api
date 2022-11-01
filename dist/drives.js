"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRoutes = fetchRoutes;
exports.getPreservedRoutes = getPreservedRoutes;
exports.getRouteInfo = getRouteInfo;
exports.getRouteSegments = getRouteSegments;
exports.getRoutesSegments = getRoutesSegments;
exports.getSegmentMetadata = getSegmentMetadata;
exports.getShareSignature = getShareSignature;
exports.listRoutes = listRoutes;
exports.setRoutePreserved = setRoutePreserved;
exports.setRoutePublic = setRoutePublic;
exports.setRouteRating = setRouteRating;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _request = _interopRequireDefault(require("./request"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SEGMENT_LENGTH = 1000 * 60;
function getSegmentMetadata(start, end, dongleId) {
  return _request.default.get("v1/devices/".concat(dongleId, "/segments"), {
    from: start,
    to: end
  });
}
function getRoutesSegments(dongleId, start, end) {
  return _request.default.get("v1/devices/".concat(dongleId, "/routes_segments"), {
    start: start,
    end: end
  });
}
function getRouteInfo(routeName) {
  return _request.default.get("v1/route/".concat(routeName, "/"));
}
function setRouteRating(routeName, rating) {
  return _request.default.patch("v1/route/".concat(routeName, "/"), {
    rating: rating
  });
}
function setRoutePublic(routeName, is_public) {
  return _request.default.patch("v1/route/".concat(routeName, "/"), {
    is_public: is_public
  });
}
function setRoutePreserved(routeName, preserved) {
  if (preserved) {
    return _request.default.post("v1/route/".concat(routeName, "/preserve"));
  }
  return _request.default.del("v1/route/".concat(routeName, "/preserve"));
}
function getPreservedRoutes(dongleId) {
  return _request.default.get("v1/devices/".concat(dongleId, "/routes/preserved"));
}
function getShareSignature(routeName) {
  return _request.default.get("v1/route/".concat(routeName, "/share_signature"));
}
function getRouteSegments(routeName) {
  return _request.default.get("v1/route/".concat(routeName, "/segments"));
}
function listRoutes(dongleId, limit, createdAfter) {
  var params = {
    limit: limit
  };
  if (typeof createdAfter !== 'undefined') {
    params.createdAfter = createdAfter;
  }
  return _request.default.get("v1/devices/".concat(dongleId, "/routes"), params);
}
function parseSegmentMetadata(start, end, segments) {
  var routeStartTimes = {};
  return segments.map(function (s) {
    var segment = _objectSpread(_objectSpread({}, s), {}, {
      duration: Math.round(s.end_time_utc_millis - s.start_time_utc_millis),
      offset: Math.round(s.start_time_utc_millis) - start
    });
    if (!routeStartTimes[s.canonical_route_name]) {
      segment.segment = Number(s.canonical_name.split('--')[2]);
      routeStartTimes[s.canonical_route_name] = segment.offset - SEGMENT_LENGTH * segment.segment;
    }
    segment.routeOffset = routeStartTimes[s.canonical_route_name];
    return segment;
  });
}

// TODO: understand this and write tests
function segmentsFromMetadata(segmentsData) {
  function finishSegment(segment) {
    if (!segment.hasVideo) {
      return;
    }
    var videoAvailableBetweenOffsets = segment.videoAvailableBetweenOffsets;
    var lastVideoRange = videoAvailableBetweenOffsets[videoAvailableBetweenOffsets.length - 1];
    if (!lastVideoRange) {
      lastVideoRange = [segment.offset, segment.offset + segment.duration];
    }

    // TODO: refactor
    // eslint-disable-next-line no-param-reassign
    segment.videoAvailableBetweenOffsets = [].concat((0, _toConsumableArray2.default)(videoAvailableBetweenOffsets.slice(0, videoAvailableBetweenOffsets.length - 1)), [[lastVideoRange[0], segment.offset + segment.duration]]);
  }
  var segment = null;
  var videoStartOffset = null;
  var segments = [];
  segmentsData.forEach(function (s) {
    if (!s.url) {
      return;
    }
    if (!(s.proc_log === 40 || s.proc_qlog === 40)) {
      return;
    }
    var segmentHasDriverCamera = s.proc_dcamera >= 0;
    var segmentHasDriverCameraStream = s.proc_dcamera === 40;
    var segmentHasVideo = s.proc_camera === 40;
    if (segmentHasVideo && videoStartOffset === null) {
      videoStartOffset = s.offset;
    }
    if (!segment || segment.route !== s.canonical_route_name) {
      if (segment) {
        finishSegment(segment);
      }
      var url = s.url;
      var parts = url.split('/');
      if (Number.isFinite(Number(parts.pop()))) {
        // url has a number at the end
        url = parts.join('/');
      }
      segment = {
        dongleId: s.dongle_id,
        offset: s.offset - s.segment * SEGMENT_LENGTH,
        route: s.canonical_route_name,
        startTime: s.start_time_utc_millis,
        startCoord: [s.start_lng, s.start_lat],
        duration: 0,
        segments: 0,
        url: url.replace('chffrprivate.blob.core.windows.net', 'chffrprivate.azureedge.net'),
        events: [],
        videoAvailableBetweenOffsets: [],
        hasVideo: segmentHasVideo,
        deviceType: s.devicetype,
        hpgps: s.hpgps,
        hasDriverCamera: segmentHasDriverCamera,
        hasDriverCameraStream: segmentHasDriverCameraStream,
        locStart: '',
        locEnd: '',
        distanceMiles: 0.0,
        cameraStreamSegCount: 0,
        driverCameraStreamSegCount: 0
      };
      segments.push(segment);
    }
    if (!segmentHasVideo && videoStartOffset !== null) {
      segment.videoAvailableBetweenOffsets.push([videoStartOffset, s.offset]);
      videoStartOffset = null;
    }
    segment.hasVideo = segment.hasVideo || segmentHasVideo;
    segment.hasDriverCamera = segment.hasDriverCamera || segmentHasDriverCamera;
    segment.hasDriverCameraStream = segment.hasDriverCameraStream || segmentHasDriverCameraStream;
    segment.hpgps = segment.hpgps || s.hpgps;
    segment.duration = s.offset - segment.offset + s.duration;
    segment.segments = Math.max(segment.segments, Number(s.canonical_name.split('--').pop()) + 1);
    segment.events = segment.events.concat(s.events);
    segment.endCoord = [s.end_lng, s.end_lat];
    segment.distanceMiles += s.length;
    segment.cameraStreamSegCount += Math.floor(segmentHasVideo);
    segment.driverCameraStreamSegCount += Math.floor(segmentHasDriverCameraStream);
  });
  if (segment) {
    finishSegment(segment);
  }
  return segments;
}
function fetchRoutes(_x, _x2, _x3) {
  return _fetchRoutes.apply(this, arguments);
}
function _fetchRoutes() {
  _fetchRoutes = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(dongleId, start, end) {
    var segments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getSegmentMetadata(start, end, dongleId);
          case 2:
            segments = _context.sent;
            segments = parseSegmentMetadata(start, end, segments);
            return _context.abrupt("return", segmentsFromMetadata(segments).reverse());
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchRoutes.apply(this, arguments);
}