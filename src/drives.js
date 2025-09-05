import request from './request';


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
