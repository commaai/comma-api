import ConfigRequestPromise from './config-request-promise';
import { VIDEO_URL_ROOT } from './config';

export default function videoApi(routeSigUrl, videoServerHost) {
  if (!videoServerHost) {
    videoServerHost = VIDEO_URL_ROOT;
  }
  let [dongleId, routeSignature] = routeSigUrl.split().slice(5,7);

  const request = ConfigRequestPromise();
  request.configure({
    baseUrl: videoServerHost + '/hls/' + dongleId + '/' + routeSignature + '/',
    parse: null,
  })

  return {
    getRearCameraStreamIndex: function() {
      return request.get('index.m3u8');
    },
    getFrontCameraStreamIndex: function() {
      return request.get('dcamera/index.m3u8');
    },
  }
}
