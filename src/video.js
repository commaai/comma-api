import urlJoin from 'url-join';
import ConfigRequestPromise from './config-request-promise';
import { VIDEO_URL_ROOT } from './config';

export default function videoApi(routeSigUrl, videoServerHost) {
  if (!videoServerHost) {
    videoServerHost = VIDEO_URL_ROOT;
  }
  let [dongleId, routeSignature] = routeSigUrl.split('/').slice(5,7);

  const request = ConfigRequestPromise();
  const baseUrl = videoServerHost + '/hls/' + dongleId + '/' + routeSignature + '/'
  request.configure({
    baseUrl: baseUrl,
    parse: null,
  })

  return {
    getRearCameraStreamIndexUrl: function() {
      return urlJoin(baseUrl, 'index.m3u8');
    },
    getFrontCameraStreamIndexUrl: function() {
      return urlJoin(baseUrl, 'dcamera/index.m3u8');
    },
    getRearCameraStreamIndex: function() {
      return request.get('index.m3u8');
    },
    getFrontCameraStreamIndexPath: function() {
      return request.get('dcamera/index.m3u8');
    },
  }
}
