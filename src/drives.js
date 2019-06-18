// Drives api
// ~~~~~~~~~~
import * as request from './request';

const SEGMENT_LENGTH = 1000 * 60;

export async function fetchRoutes(dongleId, start, end) {
  let segments = await getSegmentMetadata(start, end, dongleId);
  segments = parseSegmentMetadata(start, end, segments);
  return segmentsFromMetadata(segments).reverse();
}

export function getSegmentMetadata (start, end, dongleId) {
  return request.get('v1/devices/' + dongleId + '/segments', {
    from: start,
    to: end
  });
}

export function getRouteInfo(routeName) {
  return request.get('v1/route/' + routeName + '/');
}

function parseSegmentMetadata (start, end, segments) {
  var lastSegmentTime = 0;
  var routeStartTimes = {};
  return segments.map(function (segment) {
    segment.offset = Math.round(segment.start_time_utc_millis) - start;
    if (!routeStartTimes[segment.canonical_route_name]) {
      let segmentNum = Number(segment.canonical_name.split('--')[2]);
      segment.segment = segmentNum;
      if (segmentNum > 0) {
        routeStartTimes[segment.canonical_route_name] = segment.offset - (SEGMENT_LENGTH * segmentNum);
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
function segmentsFromMetadata (segmentsData) {
  var curSegment = null;
  var curStopTime = null;
  var curVideoStartOffset = null;
  var segments = [];
  segmentsData.forEach(function (segment) {
    if (!segment.url) {
      return;
    }
    if (segment.proc_log !== 40) {
      return;
    }
    var segmentHasDriverCamera = (segment.proc_dcamera >= 0);
    var segmentHasDriverCameraStream = (segment.proc_dcamera === 40);
    var segmentHasVideo = (segment.proc_camera === 40);
    if (segmentHasVideo && curVideoStartOffset === null) {
      curVideoStartOffset = segment.offset;
    }

    curStopTime = segment.start_time_utc_millis;
    if (!curSegment || curSegment.route !== segment.canonical_route_name) {
      if (curSegment) {
        finishSegment(curSegment);
      }
      let url = segment.url;
      let parts = url.split('/');

      if (Number.isFinite(Number(parts.pop()))) {
        // url has a number at the end
        url = parts.join('/');
      }
      curSegment = {
        dongleId: segment.dongle_id,
        offset: segment.offset - (segment.segment * SEGMENT_LENGTH),
        route: segment.canonical_route_name,
        startTime: segment.start_time_utc_millis,
        startCoord: [segment.start_lng, segment.start_lat],
        duration: 0,
        segments: 0,
        url: url.replace('chffrprivate.blob.core.windows.net', 'chffrprivate-vzn.azureedge.net'),
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
        driverCameraStreamSegCount: 0,
      };
      segments.push(curSegment);
    }
    if (!segmentHasVideo && curVideoStartOffset !== null) {
      curSegment.videoAvailableBetweenOffsets.push([curVideoStartOffset, segment.offset]);
      curVideoStartOffset = null;
    }
    curSegment.hasVideo = (curSegment.hasVideo || segmentHasVideo);
    curSegment.hasDriverCamera = (curSegment.hasDriverCamera || segmentHasDriverCamera);
    curSegment.hasDriverCameraStream = (curSegment.hasDriverCameraStream || segmentHasDriverCameraStream);
    curSegment.hpgps = (curSegment.hpgps || segment.hpgps);
    curSegment.duration = (segment.offset - curSegment.offset) + segment.duration;
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

  function finishSegment (segment) {
    var lastEngage = null;

    if (segment.hasVideo) {
      let lastVideoRange = segment.videoAvailableBetweenOffsets[segment.videoAvailableBetweenOffsets.length - 1] || [segment.offset, segment.offset + segment.duration];
      segment.videoAvailableBetweenOffsets = [
        ...segment.videoAvailableBetweenOffsets.slice(0, segment.videoAvailableBetweenOffsets.length - 1),
        [lastVideoRange[0], segment.offset + segment.duration]
      ];
    }
  }
}

function hasSegmentMetadata (state) {
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
