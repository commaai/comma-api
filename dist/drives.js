'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRoutes = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _isFinite = require('babel-runtime/core-js/number/is-finite');

var _isFinite2 = _interopRequireDefault(_isFinite);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fetchRoutes = exports.fetchRoutes = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dongleId, start, end) {
    var segments;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getSegmentMetadata(start, end, dongleId);

          case 2:
            segments = _context.sent;

            segments = parseSegmentMetadata(start, end, segments);
            return _context.abrupt('return', segmentsFromMetadata(segments).reverse());

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchRoutes(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getSegmentMetadata = getSegmentMetadata;
exports.getRoutesSegments = getRoutesSegments;
exports.getRouteInfo = getRouteInfo;
exports.setRouteRating = setRouteRating;
exports.getShareSignature = getShareSignature;
exports.getRouteSegments = getRouteSegments;
exports.listRoutes = listRoutes;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEGMENT_LENGTH = 1000 * 60; // Drives api
// ~~~~~~~~~~
function getSegmentMetadata(start, end, dongleId) {
  return request.get('v1/devices/' + dongleId + '/segments', {
    from: start,
    to: end
  });
}

function getRoutesSegments(dongleId, start, end) {
  return request.get('v1/devices/' + dongleId + '/routes_segments', {
    start: start,
    end: end
  });
}

function getRouteInfo(routeName) {
  return request.get('v1/route/' + routeName + '/');
}

function setRouteRating(routeName, rating) {
  return request.patch('v1/route/' + routeName + '/', { rating: rating });
}

function getShareSignature(routeName) {
  return request.get('v1/route/' + routeName + '/share_signature');
}

function getRouteSegments(routeName) {
  return request.get('v1/route/' + routeName + '/segments');
}

function listRoutes(dongleId, limit, createdAfter) {
  var params = { limit: limit };
  if (typeof createdAfter !== 'undefined') {
    params.createdAfter = createdAfter;
  }
  return request.get('v1/devices/' + dongleId + '/routes', params);
}
function parseSegmentMetadata(start, end, segments) {
  var lastSegmentTime = 0;
  var routeStartTimes = {};
  return segments.map(function (segment) {
    segment.offset = Math.round(segment.start_time_utc_millis) - start;
    if (!routeStartTimes[segment.canonical_route_name]) {
      var segmentNum = Number(segment.canonical_name.split('--')[2]);
      segment.segment = segmentNum;
      if (segmentNum > 0) {
        routeStartTimes[segment.canonical_route_name] = segment.offset - SEGMENT_LENGTH * segmentNum;
      } else {
        routeStartTimes[segment.canonical_route_name] = segment.offset;
      }
      segment.routeOffset = routeStartTimes[segment.canonical_route_name];
    } else {
      segment.routeOffset = routeStartTimes[segment.canonical_route_name];
    }

    lastSegmentTime = segment.offset;
    segment.duration = Math.round(segment.end_time_utc_millis - segment.start_time_utc_millis);

    return segment;
  });
}
function segmentsFromMetadata(segmentsData) {
  var curSegment = null;
  var curStopTime = null;
  var curVideoStartOffset = null;
  var segments = [];
  segmentsData.forEach(function (segment) {
    if (!segment.url) {
      return;
    }
    if (!(segment.proc_log === 40 || segment.proc_qlog === 40)) {
      return;
    }
    var segmentHasDriverCamera = segment.proc_dcamera >= 0;
    var segmentHasDriverCameraStream = segment.proc_dcamera === 40;
    var segmentHasVideo = segment.proc_camera === 40;
    if (segmentHasVideo && curVideoStartOffset === null) {
      curVideoStartOffset = segment.offset;
    }

    curStopTime = segment.start_time_utc_millis;
    if (!curSegment || curSegment.route !== segment.canonical_route_name) {
      if (curSegment) {
        finishSegment(curSegment);
      }
      var url = segment.url;
      var parts = url.split('/');

      if ((0, _isFinite2.default)(Number(parts.pop()))) {
        // url has a number at the end
        url = parts.join('/');
      }
      curSegment = {
        dongleId: segment.dongle_id,
        offset: segment.offset - segment.segment * SEGMENT_LENGTH,
        route: segment.canonical_route_name,
        startTime: segment.start_time_utc_millis,
        startCoord: [segment.start_lng, segment.start_lat],
        duration: 0,
        segments: 0,
        url: url.replace('chffrprivate.blob.core.windows.net', 'chffrprivate.azureedge.net'),
        events: [],
        videoAvailableBetweenOffsets: [],
        hasVideo: segmentHasVideo,
        deviceType: segment.devicetype,
        hpgps: segment.hpgps,
        hasDriverCamera: segmentHasDriverCamera,
        hasDriverCameraStream: segmentHasDriverCameraStream,
        locStart: '',
        locEnd: '',
        distanceMiles: 0.0,
        cameraStreamSegCount: 0,
        driverCameraStreamSegCount: 0
      };
      segments.push(curSegment);
    }
    if (!segmentHasVideo && curVideoStartOffset !== null) {
      curSegment.videoAvailableBetweenOffsets.push([curVideoStartOffset, segment.offset]);
      curVideoStartOffset = null;
    }
    curSegment.hasVideo = curSegment.hasVideo || segmentHasVideo;
    curSegment.hasDriverCamera = curSegment.hasDriverCamera || segmentHasDriverCamera;
    curSegment.hasDriverCameraStream = curSegment.hasDriverCameraStream || segmentHasDriverCameraStream;
    curSegment.hpgps = curSegment.hpgps || segment.hpgps;
    curSegment.duration = segment.offset - curSegment.offset + segment.duration;
    curSegment.segments = Math.max(curSegment.segments, Number(segment.canonical_name.split('--').pop()) + 1);
    curSegment.events = curSegment.events.concat(segment.events);
    curSegment.endCoord = [segment.end_lng, segment.end_lat];
    curSegment.distanceMiles += segment.length;
    curSegment.cameraStreamSegCount += Math.floor(segmentHasVideo);
    curSegment.driverCameraStreamSegCount += Math.floor(segmentHasDriverCameraStream);
  });

  if (curSegment) {
    finishSegment(curSegment);
  }

  return segments;

  function finishSegment(segment) {
    var lastEngage = null;

    if (segment.hasVideo) {
      var lastVideoRange = segment.videoAvailableBetweenOffsets[segment.videoAvailableBetweenOffsets.length - 1] || [segment.offset, segment.offset + segment.duration];
      segment.videoAvailableBetweenOffsets = [].concat((0, _toConsumableArray3.default)(segment.videoAvailableBetweenOffsets.slice(0, segment.videoAvailableBetweenOffsets.length - 1)), [[lastVideoRange[0], segment.offset + segment.duration]]);
    }
  }
}

function hasSegmentMetadata(state) {
  if (!state.segmentData) {
    console.log('No segment data at all');
    return false;
  }
  if (!state.segmentData.segments) {
    console.log('Still loading...');
    return false;
  }
  if (state.dongleId !== state.segmentData.dongleId) {
    console.log('Bad dongle id');;
    return false;
  }
  if (state.start < state.segmentData.start) {
    console.log('Bad start offset');
    return false;
  }
  if (state.end > state.segmentData.end) {
    console.log('Bad end offset');
    return false;
  }
  if (state.end > state.segmentData.end) {
    console.log('Bad end offset');
    return false;
  }

  return state.start >= state.segmentData.start && state.end <= state.segmentData.end;
}