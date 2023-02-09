var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  account: () => account_exports,
  athena: () => athena_exports,
  auth: () => auth_exports,
  billing: () => billing_exports,
  clips: () => clips_exports,
  derived: () => routeApi,
  devices: () => devices_exports,
  drives: () => drives_exports,
  navigation: () => navigation_exports,
  raw: () => raw_exports,
  request: () => request_default,
  video: () => video_exports
});
module.exports = __toCommonJS(src_exports);

// src/account.ts
var account_exports = {};
__export(account_exports, {
  getProfile: () => getProfile
});

// src/config.ts
var config_default = {
  COMMA_API_URL: (window == null ? void 0 : window.Comma.COMMA_API_URL) || "https://api.comma.ai/",
  ATHENA_API_URL: (window == null ? void 0 : window.Comma.ATHENA_API_URL) || "https://athena.comma.ai/",
  BILLING_API_URL: (window == null ? void 0 : window.Comma.BILLING_API_URL) || "https://billing.comma.ai/"
};

// src/instance.ts
var RequestError = class extends Error {
  constructor(resp, ...params) {
    super(...params);
    this.resp = resp;
  }
};
var ConfigRequest = class {
  constructor(baseUrl) {
    this.defaultHeaders = {
      "Content-Type": "application/json"
    };
    this.baseUrl = baseUrl + (!baseUrl.endsWith("/") ? "/" : "");
  }
  configure(accessToken) {
    this.defaultHeaders["Authorization"] = `JWT ${accessToken}`;
  }
  async request(method, endpoint, params, dataJson = true, respJson = true) {
    const headers = { ...this.defaultHeaders };
    if (!dataJson) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    let requestUrl = this.baseUrl + endpoint;
    let body;
    if (params && Object.keys(params).length !== 0) {
      if (method === "GET" || method === "HEAD") {
        requestUrl += `?${new URLSearchParams(params)}`;
      } else if (dataJson) {
        body = JSON.stringify(params);
      } else {
        body = new URLSearchParams(params).toString();
      }
    }
    const resp = await fetch(requestUrl, { method, headers, body });
    if (!resp.ok) {
      const error = await resp.text();
      throw new RequestError(resp, `${resp.status}: ${error}`);
    }
    if (!respJson) {
      return resp;
    }
    return resp.json();
  }
  async get(endpoint, params, dataJson = true, respJson = true) {
    return this.request("GET", endpoint, params, dataJson, respJson);
  }
  async head(endpoint, params, dataJson = true, respJson = true) {
    return this.request("HEAD", endpoint, params, dataJson, respJson);
  }
  async post(endpoint, params, dataJson = true, respJson = true) {
    return this.request("POST", endpoint, params, dataJson, respJson);
  }
  async postForm(endpoint, params) {
    return this.post(endpoint, params, false);
  }
  async put(endpoint, params, dataJson = true, respJson = true) {
    return this.request("PUT", endpoint, params, dataJson, respJson);
  }
  async delete(endpoint, params, dataJson = true, respJson = true) {
    return this.request("DELETE", endpoint, params, dataJson, respJson);
  }
  async patch(endpoint, params, dataJson = true, respJson = true) {
    return this.request("PATCH", endpoint, params, dataJson, respJson);
  }
};

// src/request.ts
var request_default = new ConfigRequest(config_default.COMMA_API_URL);

// src/account.ts
function getProfile(dongleId = "me") {
  return request_default.get(`v1/${dongleId}/`);
}

// src/athena.ts
var athena_exports = {};
__export(athena_exports, {
  configure: () => configure,
  postJsonRpcPayload: () => postJsonRpcPayload
});
var request = new ConfigRequest(config_default.ATHENA_API_URL);
function configure(accessToken) {
  request.configure(accessToken);
}
async function postJsonRpcPayload(dongleId, payload) {
  return request.post(dongleId, payload);
}

// src/auth.ts
var auth_exports = {};
__export(auth_exports, {
  refreshAccessToken: () => refreshAccessToken
});
async function refreshAccessToken(code, provider) {
  const resp = await request_default.postForm("v2/auth/", { code, provider });
  if (resp.access_token != null) {
    request_default.configure(resp.access_token);
    return resp.access_token;
  }
  if (resp.response !== void 0) {
    throw new Error(`Could not exchange oauth code for access token: response ${resp.response}`);
  } else if (resp.error !== void 0) {
    throw new Error(`Could not exchange oauth code for access token: error ${resp.error}`);
  } else {
    throw new Error(`Could not exchange oauth code for access token: ${resp}`);
  }
}

// src/billing.ts
var billing_exports = {};
__export(billing_exports, {
  cancelPrime: () => cancelPrime,
  configure: () => configure2,
  getSimValid: () => getSimValid,
  getStripeCheckout: () => getStripeCheckout,
  getStripePortal: () => getStripePortal,
  getStripeSession: () => getStripeSession,
  getSubscribeInfo: () => getSubscribeInfo,
  getSubscription: () => getSubscription
});
var request2 = new ConfigRequest(config_default.BILLING_API_URL);
function configure2(accessToken) {
  request2.configure(accessToken);
}
async function getSubscription(dongle_id) {
  return request2.get("v1/prime/subscription", { dongle_id });
}
async function getSubscribeInfo(dongle_id) {
  return request2.get("v1/prime/subscribe_info", { dongle_id });
}
async function cancelPrime(dongle_id) {
  return request2.post("v1/prime/cancel", { dongle_id });
}
async function getSimValid(dongle_id, sim_id) {
  return request2.get("v1/prime/sim_valid", { dongle_id, sim_id });
}
async function getStripeCheckout(dongle_id, sim_id, plan) {
  return request2.post("v1/prime/stripe_checkout", { dongle_id, sim_id, plan });
}
async function getStripePortal(dongle_id) {
  return request2.get("v1/prime/stripe_portal", { dongle_id });
}
async function getStripeSession(dongle_id, session_id) {
  return request2.get("v1/prime/stripe_session", { dongle_id, session_id });
}

// src/clips.ts
var clips_exports = {};
__export(clips_exports, {
  clipsCreate: () => clipsCreate,
  clipsDelete: () => clipsDelete,
  clipsDetails: () => clipsDetails,
  clipsList: () => clipsList,
  clipsUpdate: () => clipsUpdate
});
async function clipsCreate(route, title, start_time, end_time, video_type, is_public) {
  return request_default.post("v1/clips/create", {
    route,
    title,
    start_time,
    end_time,
    video_type,
    is_public
  });
}
async function clipsList(dongle_id) {
  return request_default.get("v1/clips/list", { dongle_id });
}
async function clipsDetails(dongle_id, clip_id) {
  return request_default.get("v1/clips/details", { dongle_id, clip_id });
}
async function clipsUpdate(dongle_id, clip_id, is_public) {
  return request_default.patch("v1/clips/update", { dongle_id, clip_id, is_public });
}
async function clipsDelete(dongle_id, clip_id) {
  return request_default.delete("v1/clips/update", { dongle_id, clip_id });
}

// src/devices.ts
var devices_exports = {};
__export(devices_exports, {
  fetchDevice: () => fetchDevice,
  fetchDeviceOwner: () => fetchDeviceOwner,
  fetchDeviceStats: () => fetchDeviceStats,
  fetchLocation: () => fetchLocation,
  getAthenaQueue: () => getAthenaQueue,
  grantDeviceReadPermission: () => grantDeviceReadPermission,
  listDevices: () => listDevices,
  pilotPair: () => pilotPair,
  removeDeviceReadPermission: () => removeDeviceReadPermission,
  setDeviceAlias: () => setDeviceAlias,
  unpair: () => unpair
});
function listDevices() {
  return request_default.get("v1/me/devices/");
}
function setDeviceAlias(dongleId, alias) {
  return request_default.patch(`v1/devices/${dongleId}/`, { alias });
}
function grantDeviceReadPermission(dongleId, email) {
  return request_default.post(`v1/devices/${dongleId}/add_user`, { email });
}
function removeDeviceReadPermission(dongleId, email) {
  return request_default.post(`v1/devices/${dongleId}/del_user`, { email });
}
async function fetchLocation(dongleId) {
  const locationEndpoint = `v1/devices/${dongleId}/location`;
  const location = await request_default.get(locationEndpoint);
  if (location !== void 0 && location.error === void 0) {
    return location;
  }
  throw Error(`Could not fetch device location: ${JSON.stringify(location)}`);
}
function fetchDevice(dongleId) {
  const deviceEndpoint = `v1.1/devices/${dongleId}/`;
  return request_default.get(deviceEndpoint);
}
function pilotPair(pair_token) {
  return request_default.postForm("v2/pilotpair/", { pair_token });
}
function fetchDeviceStats(dongleId) {
  return request_default.get(`v1.1/devices/${dongleId}/stats`);
}
function unpair(dongleId) {
  return request_default.post(`v1/devices/${dongleId}/unpair`);
}
function fetchDeviceOwner(dongleId) {
  return request_default.get(`v1/devices/${dongleId}/owner`);
}
function getAthenaQueue(dongleId) {
  return request_default.get(`v1/devices/${dongleId}/athena_offline_queue`);
}

// src/derived.ts
function routeApi(routeSigUrl) {
  const request4 = new ConfigRequest(routeSigUrl);
  return {
    getCoords: async (cacheKey = 0) => request4.get(`route.coords?s=${cacheKey}`),
    getJpegUrl: (routeOffsetSeconds) => `${routeSigUrl}/sec/${routeOffsetSeconds.toString()}.jpg`
  };
}

// src/drives.ts
var drives_exports = {};
__export(drives_exports, {
  fetchRoutes: () => fetchRoutes,
  getPreservedRoutes: () => getPreservedRoutes,
  getRouteInfo: () => getRouteInfo,
  getRouteSegments: () => getRouteSegments,
  getRoutesSegments: () => getRoutesSegments,
  getSegmentMetadata: () => getSegmentMetadata,
  getShareSignature: () => getShareSignature,
  listRoutes: () => listRoutes,
  setRoutePreserved: () => setRoutePreserved,
  setRoutePublic: () => setRoutePublic
});
var SEGMENT_LENGTH = 1e3 * 60;
function getSegmentMetadata(start, end, dongleId) {
  return request_default.get(`v1/devices/${dongleId}/segments`, {
    from: start,
    to: end
  });
}
function getRoutesSegments(dongleId, start, end) {
  return request_default.get(`v1/devices/${dongleId}/routes_segments`, { start, end });
}
function getRouteInfo(routeName) {
  return request_default.get(`v1/route/${routeName}/`);
}
function setRoutePublic(routeName, is_public) {
  return request_default.patch(`v1/route/${routeName}/`, { is_public });
}
function setRoutePreserved(routeName, preserved) {
  return request_default.request(preserved ? "POST" : "DELETE", `v1/route/${routeName}/preserve`);
}
function getPreservedRoutes(dongleId) {
  return request_default.get(`v1/devices/${dongleId}/routes/preserved`);
}
function getShareSignature(routeName) {
  return request_default.get(`v1/route/${routeName}/share_signature`);
}
function getRouteSegments(routeName) {
  return request_default.get(`v1/route/${routeName}/segments`);
}
function listRoutes(dongleId, limit, createdAfter) {
  return request_default.get(`v1/devices/${dongleId}/routes`, { limit, createdAfter });
}
function parseSegmentMetadata(start, end, segments) {
  const routeStartTimes = {};
  return segments.map((s) => {
    const segment = {
      ...s,
      duration: Math.round(s.end_time_utc_millis - s.start_time_utc_millis),
      offset: Math.round(s.start_time_utc_millis) - start
    };
    if (!routeStartTimes[s.canonical_route_name]) {
      segment.segment = Number(s.canonical_name.split("--")[2]);
      routeStartTimes[s.canonical_route_name] = segment.offset - SEGMENT_LENGTH * segment.segment;
    }
    segment.routeOffset = routeStartTimes[s.canonical_route_name];
    return segment;
  });
}
function segmentsFromMetadata(segmentsData) {
  function finishSegment(segment2) {
    if (!segment2.hasVideo) {
      return;
    }
    const { videoAvailableBetweenOffsets } = segment2;
    let lastVideoRange = videoAvailableBetweenOffsets[videoAvailableBetweenOffsets.length - 1];
    if (!lastVideoRange) {
      lastVideoRange = [segment2.offset, segment2.offset + segment2.duration];
    }
    segment2.videoAvailableBetweenOffsets = [
      ...videoAvailableBetweenOffsets.slice(0, videoAvailableBetweenOffsets.length - 1),
      [lastVideoRange[0], segment2.offset + segment2.duration]
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
    const segmentHasDriverCamera = s.proc_dcamera >= 0;
    const segmentHasDriverCameraStream = s.proc_dcamera === 40;
    const segmentHasVideo = s.proc_camera === 40;
    if (segmentHasVideo && videoStartOffset === null) {
      videoStartOffset = s.offset;
    }
    if (!segment || segment.route !== s.canonical_route_name) {
      if (segment) {
        finishSegment(segment);
      }
      let { url } = s;
      const parts = url.split("/");
      if (Number.isFinite(Number(parts.pop()))) {
        url = parts.join("/");
      }
      segment = {
        dongleId: s.dongle_id,
        offset: s.offset - s.segment * SEGMENT_LENGTH,
        route: s.canonical_route_name,
        startTime: s.start_time_utc_millis,
        startCoord: [s.start_lng, s.start_lat],
        duration: 0,
        segments: 0,
        url: url.replace("chffrprivate.blob.core.windows.net", "chffrprivate.azureedge.net"),
        events: [],
        videoAvailableBetweenOffsets: [],
        hasVideo: segmentHasVideo,
        deviceType: s.devicetype,
        hpgps: s.hpgps,
        hasDriverCamera: segmentHasDriverCamera,
        hasDriverCameraStream: segmentHasDriverCameraStream,
        locStart: "",
        locEnd: "",
        distanceMiles: 0,
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
    segment.segments = Math.max(segment.segments, Number(s.canonical_name.split("--").pop()) + 1);
    segment.events = segment.events.concat(s.events);
    segment.endCoord = [s.end_lng, s.end_lat];
    segment.distanceMiles += s.length;
    segment.cameraStreamSegCount += segmentHasVideo;
    segment.driverCameraStreamSegCount += segmentHasDriverCameraStream;
  });
  if (segment) {
    finishSegment(segment);
  }
  return segments;
}
async function fetchRoutes(dongleId, start, end) {
  let segments = await getSegmentMetadata(start, end, dongleId);
  segments = parseSegmentMetadata(start, end, segments);
  return segmentsFromMetadata(segments).reverse();
}

// src/raw.ts
var raw_exports = {};
__export(raw_exports, {
  getLogUrls: () => getLogUrls,
  getRouteFiles: () => getRouteFiles,
  getUploadUrl: () => getUploadUrl,
  getUploadUrls: () => getUploadUrls
});
var urlStore = {};
async function getCached(endpoint, params, nocache = false) {
  let url = endpoint;
  if (params !== void 0) {
    url += `?${new URLSearchParams(params)}`;
  }
  if (urlStore[url] && !nocache) {
    return urlStore[url];
  }
  urlStore[url] = await request_default.get(url);
  setTimeout(() => {
    delete urlStore[url];
  }, 1e3 * 60 * 45);
  return urlStore[url];
}
function getRouteFiles(routeName, nocache = false, params = void 0) {
  return getCached(`v1/route/${routeName}/files`, params, nocache);
}
function getLogUrls(routeName, params) {
  return getCached(`v1/route/${routeName}/log_urls`, params);
}
function getUploadUrl(dongleId, path, expiry_days) {
  return getCached(`v1.4/${dongleId}/upload_url/`, { path, expiry_days });
}
async function getUploadUrls(dongleId, paths, expiry_days) {
  return request_default.post(`v1/${dongleId}/upload_urls/`, { paths, expiry_days });
}

// src/navigation.ts
var navigation_exports = {};
__export(navigation_exports, {
  deleteLocationSave: () => deleteLocationSave,
  getLocationsData: () => getLocationsData,
  getLocationsNext: () => getLocationsNext,
  patchLocationSave: () => patchLocationSave,
  putLocationSave: () => putLocationSave,
  setDestination: () => setDestination
});
function setDestination(dongleId, latitude, longitude, place_name, place_details) {
  return request_default.post(`v1/navigation/${dongleId}/set_destination`, {
    latitude,
    longitude,
    place_name,
    place_details
  });
}
function getLocationsData(dongleId) {
  return request_default.get(`v1/navigation/${dongleId}/locations`);
}
function putLocationSave(dongleId, latitude, longitude, place_name, place_details, save_type, label) {
  return request_default.put(`v1/navigation/${dongleId}/locations`, {
    latitude,
    longitude,
    place_name,
    place_details,
    save_type,
    label
  });
}
function patchLocationSave(dongleId, navLocationId, saveType, label) {
  return request_default.patch(`v1/navigation/${dongleId}/locations`, {
    id: navLocationId,
    save_type: saveType,
    label
  });
}
function deleteLocationSave(dongleId, navLocationId) {
  return request_default.delete(`v1/navigation/${dongleId}/locations`, { id: navLocationId });
}
function getLocationsNext(dongleId) {
  return request_default.get(`v1/navigation/${dongleId}/next`);
}

// src/video.ts
var video_exports = {};
__export(video_exports, {
  getQcameraStreamUrl: () => getQcameraStreamUrl
});
var request3 = new ConfigRequest(config_default.COMMA_API_URL);
function getQcameraStreamUrl(routeStr, exp, sig) {
  return `${request3.baseUrl}v1/route/${routeStr}/qcamera.m3u8?${new URLSearchParams({ exp, sig })}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  account,
  athena,
  auth,
  billing,
  clips,
  derived,
  devices,
  drives,
  navigation,
  raw,
  request,
  video
});
//# sourceMappingURL=index.cjs.map