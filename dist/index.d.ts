declare function getProfile(dongleId?: string): Promise<any>;

declare const account_getProfile: typeof getProfile;
declare namespace account {
  export {
    account_getProfile as getProfile,
  };
}

declare function configure$1(accessToken: string): void;
declare function postJsonRpcPayload(dongleId: string, payload: Record<string, any>): Promise<any>;

declare const athena_postJsonRpcPayload: typeof postJsonRpcPayload;
declare namespace athena {
  export {
    configure$1 as configure,
    athena_postJsonRpcPayload as postJsonRpcPayload,
  };
}

declare const GOOGLE_REDIRECT_LINK: string;
declare const APPLE_REDIRECT_LINK: string;
declare const GITHUB_REDIRECT_LINK: string;

declare const config_APPLE_REDIRECT_LINK: typeof APPLE_REDIRECT_LINK;
declare const config_GITHUB_REDIRECT_LINK: typeof GITHUB_REDIRECT_LINK;
declare const config_GOOGLE_REDIRECT_LINK: typeof GOOGLE_REDIRECT_LINK;
declare namespace config {
  export {
    config_APPLE_REDIRECT_LINK as APPLE_REDIRECT_LINK,
    config_GITHUB_REDIRECT_LINK as GITHUB_REDIRECT_LINK,
    config_GOOGLE_REDIRECT_LINK as GOOGLE_REDIRECT_LINK,
  };
}

declare function refreshAccessToken(code: string, provider: string): Promise<string>;
declare function isSignedIn(): boolean;
declare function getAccessToken(): string | null;
declare function signOut(): void;

declare const index_config: typeof config;
declare const index_getAccessToken: typeof getAccessToken;
declare const index_isSignedIn: typeof isSignedIn;
declare const index_refreshAccessToken: typeof refreshAccessToken;
declare const index_signOut: typeof signOut;
declare namespace index {
  export {
    index_config as config,
    index_getAccessToken as getAccessToken,
    index_isSignedIn as isSignedIn,
    index_refreshAccessToken as refreshAccessToken,
    index_signOut as signOut,
  };
}

declare function configure(accessToken: string): void;
declare function getSubscription(dongle_id: string): Promise<any>;
declare function getSubscribeInfo(dongle_id: string): Promise<any>;
declare function cancelPrime(dongle_id: string): Promise<any>;
declare function getSimValid(dongle_id: string, sim_id: string): Promise<any>;
declare function getStripeCheckout(dongle_id: string, sim_id: string, plan: string): Promise<any>;
declare function getStripePortal(dongle_id: string): Promise<any>;
declare function getStripeSession(dongle_id: string, session_id: string): Promise<any>;

declare const billing_cancelPrime: typeof cancelPrime;
declare const billing_configure: typeof configure;
declare const billing_getSimValid: typeof getSimValid;
declare const billing_getStripeCheckout: typeof getStripeCheckout;
declare const billing_getStripePortal: typeof getStripePortal;
declare const billing_getStripeSession: typeof getStripeSession;
declare const billing_getSubscribeInfo: typeof getSubscribeInfo;
declare const billing_getSubscription: typeof getSubscription;
declare namespace billing {
  export {
    billing_cancelPrime as cancelPrime,
    billing_configure as configure,
    billing_getSimValid as getSimValid,
    billing_getStripeCheckout as getStripeCheckout,
    billing_getStripePortal as getStripePortal,
    billing_getStripeSession as getStripeSession,
    billing_getSubscribeInfo as getSubscribeInfo,
    billing_getSubscription as getSubscription,
  };
}

declare function clipsCreate(route: string, title: string, start_time: number, end_time: number, video_type: string, is_public: boolean): Promise<any>;
declare function clipsList(dongle_id: string): Promise<any>;
declare function clipsDetails(dongle_id: string, clip_id: string): Promise<any>;
declare function clipsUpdate(dongle_id: string, clip_id: string, is_public: boolean): Promise<any>;
declare function clipsDelete(dongle_id: string, clip_id: string): Promise<any>;

declare const clips_clipsCreate: typeof clipsCreate;
declare const clips_clipsDelete: typeof clipsDelete;
declare const clips_clipsDetails: typeof clipsDetails;
declare const clips_clipsList: typeof clipsList;
declare const clips_clipsUpdate: typeof clipsUpdate;
declare namespace clips {
  export {
    clips_clipsCreate as clipsCreate,
    clips_clipsDelete as clipsDelete,
    clips_clipsDetails as clipsDetails,
    clips_clipsList as clipsList,
    clips_clipsUpdate as clipsUpdate,
  };
}

declare function listDevices(): Promise<any>;
declare function setDeviceAlias(dongleId: string, alias: string): Promise<any>;
declare function grantDeviceReadPermission(dongleId: string, email: string): Promise<any>;
declare function removeDeviceReadPermission(dongleId: string, email: string): Promise<any>;
declare function fetchLocation(dongleId: string): Promise<any>;
declare function fetchDevice(dongleId: string): Promise<any>;
declare function pilotPair(pair_token: string): Promise<any>;
declare function fetchDeviceStats(dongleId: string): Promise<any>;
declare function unpair(dongleId: string): Promise<any>;
declare function fetchDeviceOwner(dongleId: string): Promise<any>;
declare function getAthenaQueue(dongleId: string): Promise<any>;

declare const devices_fetchDevice: typeof fetchDevice;
declare const devices_fetchDeviceOwner: typeof fetchDeviceOwner;
declare const devices_fetchDeviceStats: typeof fetchDeviceStats;
declare const devices_fetchLocation: typeof fetchLocation;
declare const devices_getAthenaQueue: typeof getAthenaQueue;
declare const devices_grantDeviceReadPermission: typeof grantDeviceReadPermission;
declare const devices_listDevices: typeof listDevices;
declare const devices_pilotPair: typeof pilotPair;
declare const devices_removeDeviceReadPermission: typeof removeDeviceReadPermission;
declare const devices_setDeviceAlias: typeof setDeviceAlias;
declare const devices_unpair: typeof unpair;
declare namespace devices {
  export {
    devices_fetchDevice as fetchDevice,
    devices_fetchDeviceOwner as fetchDeviceOwner,
    devices_fetchDeviceStats as fetchDeviceStats,
    devices_fetchLocation as fetchLocation,
    devices_getAthenaQueue as getAthenaQueue,
    devices_grantDeviceReadPermission as grantDeviceReadPermission,
    devices_listDevices as listDevices,
    devices_pilotPair as pilotPair,
    devices_removeDeviceReadPermission as removeDeviceReadPermission,
    devices_setDeviceAlias as setDeviceAlias,
    devices_unpair as unpair,
  };
}

declare function routeApi(routeSigUrl: string): {
    getCoords: (cacheKey?: number) => Promise<any>;
    getJpegUrl: (routeOffsetSeconds: number) => string;
};

declare function getSegmentMetadata(start: number, end: number, dongleId: string): Promise<any>;
declare function getRoutesSegments(dongleId: string, start: number, end: number): Promise<any>;
declare function getRouteInfo(routeName: string): Promise<any>;
declare function setRoutePublic(routeName: string, is_public: boolean): Promise<any>;
declare function setRoutePreserved(routeName: string, preserved: boolean): Promise<any>;
declare function getPreservedRoutes(dongleId: string): Promise<any>;
declare function getShareSignature(routeName: string): Promise<any>;
declare function getRouteSegments(routeName: string): Promise<any>;
declare function listRoutes(dongleId: string, limit: number, createdAfter?: number): Promise<any>;
declare function fetchRoutes(dongleId: string, start: number, end: number): Promise<any[]>;

declare const drives_fetchRoutes: typeof fetchRoutes;
declare const drives_getPreservedRoutes: typeof getPreservedRoutes;
declare const drives_getRouteInfo: typeof getRouteInfo;
declare const drives_getRouteSegments: typeof getRouteSegments;
declare const drives_getRoutesSegments: typeof getRoutesSegments;
declare const drives_getSegmentMetadata: typeof getSegmentMetadata;
declare const drives_getShareSignature: typeof getShareSignature;
declare const drives_listRoutes: typeof listRoutes;
declare const drives_setRoutePreserved: typeof setRoutePreserved;
declare const drives_setRoutePublic: typeof setRoutePublic;
declare namespace drives {
  export {
    drives_fetchRoutes as fetchRoutes,
    drives_getPreservedRoutes as getPreservedRoutes,
    drives_getRouteInfo as getRouteInfo,
    drives_getRouteSegments as getRouteSegments,
    drives_getRoutesSegments as getRoutesSegments,
    drives_getSegmentMetadata as getSegmentMetadata,
    drives_getShareSignature as getShareSignature,
    drives_listRoutes as listRoutes,
    drives_setRoutePreserved as setRoutePreserved,
    drives_setRoutePublic as setRoutePublic,
  };
}

declare function getRouteFiles(routeName: string, nocache?: boolean, params?: undefined): Promise<any>;
declare function getUploadUrl(dongleId: string, path: string, expiry_days?: number): Promise<any>;
declare function getUploadUrls(dongleId: string, paths: string[], expiry_days?: number): Promise<any>;

declare const raw_getRouteFiles: typeof getRouteFiles;
declare const raw_getUploadUrl: typeof getUploadUrl;
declare const raw_getUploadUrls: typeof getUploadUrls;
declare namespace raw {
  export {
    raw_getRouteFiles as getRouteFiles,
    raw_getUploadUrl as getUploadUrl,
    raw_getUploadUrls as getUploadUrls,
  };
}

type HTTPHeader = 'Authorization' | 'Content-Type';
declare class ConfigRequest {
    baseUrl: string;
    defaultHeaders: {
        [name in HTTPHeader]?: string;
    };
    constructor(baseUrl: string);
    setDefaultHeader(name: HTTPHeader, value: string): void;
    removeDefaultHeader(name: HTTPHeader): void;
    request(method: string, endpoint: string, params?: Record<string, any>, dataJson?: boolean, respJson?: boolean): Promise<any>;
    get(endpoint: string, params?: Record<string, any>, dataJson?: boolean, respJson?: boolean): Promise<any>;
    head(endpoint: string, params?: Record<string, any>, dataJson?: boolean, respJson?: boolean): Promise<any>;
    post(endpoint: string, params?: Record<string, any>, dataJson?: boolean, respJson?: boolean): Promise<any>;
    postForm(endpoint: string, params?: Record<string, any>): Promise<any>;
    put(endpoint: string, params?: Record<string, any>, dataJson?: boolean, respJson?: boolean): Promise<any>;
    delete(endpoint: string, params?: Record<string, any>, dataJson?: boolean, respJson?: boolean): Promise<any>;
    patch(endpoint: string, params?: Record<string, any>, dataJson?: boolean, respJson?: boolean): Promise<any>;
}

declare const _default: ConfigRequest;

declare function setDestination(dongleId: string, latitude: number, longitude: number, place_name: string, place_details: string): Promise<any>;
declare function getLocationsData(dongleId: string): Promise<any>;
declare function putLocationSave(dongleId: string, latitude: number, longitude: number, place_name: string, place_details: string, save_type?: 'favorite' | 'recent', label?: string): Promise<any>;
declare function patchLocationSave(dongleId: string, navLocationId: number, saveType: 'favorite' | 'recent', label?: string): Promise<any>;
declare function deleteLocationSave(dongleId: string, navLocationId: number): Promise<any>;
declare function getLocationsNext(dongleId: string): Promise<any>;

declare const navigation_deleteLocationSave: typeof deleteLocationSave;
declare const navigation_getLocationsData: typeof getLocationsData;
declare const navigation_getLocationsNext: typeof getLocationsNext;
declare const navigation_patchLocationSave: typeof patchLocationSave;
declare const navigation_putLocationSave: typeof putLocationSave;
declare const navigation_setDestination: typeof setDestination;
declare namespace navigation {
  export {
    navigation_deleteLocationSave as deleteLocationSave,
    navigation_getLocationsData as getLocationsData,
    navigation_getLocationsNext as getLocationsNext,
    navigation_patchLocationSave as patchLocationSave,
    navigation_putLocationSave as putLocationSave,
    navigation_setDestination as setDestination,
  };
}

declare function getQcameraStreamUrl(routeStr: string, exp: string, sig: string): string;

declare const video_getQcameraStreamUrl: typeof getQcameraStreamUrl;
declare namespace video {
  export {
    video_getQcameraStreamUrl as getQcameraStreamUrl,
  };
}

export { account, athena, index as auth, billing, clips, routeApi as derived, devices, drives, navigation, raw, _default as request, video };
