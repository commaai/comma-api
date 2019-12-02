import urlJoin from 'url-join';
import ConfigRequestPromise from './config-request-promise';
import { VIDEO_HOST } from './config';

export default function videoApi(routeSigUrl, videoServerHost) {
  if (!videoServerHost) {
    videoServerHost = VIDEO_HOST;
  }
  let [dongleId, routeSignature] = routeSigUrl.split('/').slice(5,7);

  const videoserverRequest = ConfigRequestPromise();
  videoserverRequest.configure({
    baseUrl: videoServerHost + '/hls/' + dongleId + '/' + routeSignature + '/',
    parse: null,
  });
  const storageRequest = ConfigRequestPromise();
  storageRequest.configure({
    baseUrl: routeSigUrl + '/',
    parse: null,
  });

  return {
    getRearCameraStreamIndexUrl: function() {
      return urlJoin(baseUrl, 'index.m3u8');
    },
    getFrontCameraStreamIndexUrl: function() {
      return urlJoin(baseUrl, 'dcamera/index.m3u8');
    },
    getQcameraStreamIndexUrl: function() {
      return urlJoin(routeSigUrl, 'qcamera.m3u8?t=' + Date.now());
    },
    getRearCameraStreamIndex: function() {
      return videoserverRequest.get('index.m3u8');
    },
    getFrontCameraStreamIndexPath: function() {
      return videoserverRequest.get('dcamera/index.m3u8');
    },
    getQcameraStreamIndex: function(max) {
      return storageRequest.get('qcamera.m3u8?t=' + Date.now());
    },
  }
}
