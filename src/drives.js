import request from './request';


const SEGMENT_LENGTH = 1000 * 60;

export function getSegmentMetadata(start, end, dongleId) {
  return request.get(`v1/devices/${dongleId}/segments`, {
    from: start,
    to: end,
  });
}

export function getRoutesSegments(dongleId, start, end, limit, route_str) {
  return request.get(`v1/devices/${dongleId}/routes_segments`, {
    start, end, limit, route_str,
  });
}

export function getRouteInfo(routeName) {
  return request.get(`v1/route/${routeName}/`);
}

export function setRouteRating(routeName, rating) {
  return request.patch(`v1/route/${routeName}/`, { rating });
}

export function setRoutePublic(routeName, is_public) {
  return request.patch(`v1/route/${routeName}/`, { is_public });
}

export function setRoutePreserved(routeName, preserved) {
  return request.request(preserved ? 'POST' : 'DELETE', `v1/route/${routeName}/preserve`);
}

export function getPreservedRoutes(dongleId) {
  return request.get(`v1/devices/${dongleId}/routes/preserved`);
}

export function getShareSignature(routeName) {
  return request.get(`v1/route/${routeName}/share_signature`);
}

export function getRouteSegments(routeName) {
  return request.get(`v1/route/${routeName}/segments`);
}

export function listRoutes(dongleId, limit, createdAfter) {
  const params = { limit };
  if (typeof createdAfter !== 'undefined') {
    params.createdAfter = createdAfter;
  }
  return request.get(`v1/devices/${dongleId}/routes`, params);
}

function parseSegmentMetadata(start, end, segments) {
  const routeStartTimes = {};

  return segments.map((s) => {
    const segment = {
      ...s,
      duration: Math.round(s.end_time_utc_millis - s.start_time_utc_millis),
      offset: Math.round(s.start_time_utc_millis) - start,
    };

    if (!routeStartTimes[s.canonical_route_name]) {
      segment.segment = Number(s.canonical_name.split('--')[2]);
      routeStartTimes[s.canonical_route_name] = segment.offset - (SEGMENT_LENGTH * segment.segment);
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

    const { videoAvailableBetweenOffsets } = segment;
    let lastVideoRange = videoAvailableBetweenOffsets[videoAvailableBetweenOffsets.length - 1];
    if (!lastVideoRange) {
      lastVideoRange = [segment.offset, segment.offset + segment.duration];
    }

    // TODO: refactor
    // eslint-disable-next-line no-param-reassign
    segment.videoAvailableBetweenOffsets = [
      ...videoAvailableBetweenOffsets.slice(0, videoAvailableBetweenOffsets.length - 1),
      [lastVideoRange[0], segment.offset + segment.duration],
    ];
  }

  let segment = null;
  let videoStartOffset = null;
  const segments = [];
  segmentsData.forEach((s) => {
    if (!s.url) {
      return;
    }
    if (!(s.proc_log === 40 || s.proc_qlog === 40)) {
      return;
    }
    const segmentHasDriverCamera = (s.proc_dcamera >= 0);
    const segmentHasDriverCameraStream = (s.proc_dcamera === 40);
    const segmentHasVideo = (s.proc_camera === 40);
    if (segmentHasVideo && videoStartOffset === null) {
      videoStartOffset = s.offset;
    }

    if (!segment || segment.route !== s.canonical_route_name) {
      if (segment) {
        finishSegment(segment);
      }
      let { url } = s;
      const parts = url.split('/');

      if (Number.isFinite(Number(parts.pop()))) {
        // url has a number at the end
        url = parts.join('/');
      }
      segment = {
        dongleId: s.dongle_id,
        offset: s.offset - (s.segment * SEGMENT_LENGTH),
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
        driverCameraStreamSegCount: 0,
      };
      segments.push(segment);
    }
    if (!segmentHasVideo && videoStartOffset !== null) {
      segment.videoAvailableBetweenOffsets.push([videoStartOffset, s.offset]);
      videoStartOffset = null;
    }
    segment.hasVideo = (segment.hasVideo || segmentHasVideo);
    segment.hasDriverCamera = (segment.hasDriverCamera || segmentHasDriverCamera);
    segment.hasDriverCameraStream = (segment.hasDriverCameraStream || segmentHasDriverCameraStream);
    segment.hpgps = (segment.hpgps || s.hpgps);
    segment.duration = (s.offset - segment.offset) + s.duration;
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

export async function fetchRoutes(dongleId, start, end) {
  let segments = await getSegmentMetadata(start, end, dongleId);
  segments = parseSegmentMetadata(start, end, segments);
  return segmentsFromMetadata(segments).reverse();
}
