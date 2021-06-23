import ConfigRequest from './instance';
import { VIDEO_HOST } from './config';

export default function videoApi(routeSigUrl, videoServerHost) {
  if (!videoServerHost) {
    videoServerHost = VIDEO_HOST;
  }
  let [dongleId, routeSignature] = routeSigUrl.split('/').slice(5,7);

  const videoserverBaseUrl = videoServerHost + '/hls/' + dongleId + '/' + routeSignature;
  const videoserverRequest = new ConfigRequest(videoserverBaseUrl);
  const storageRequest = new ConfigRequest(routeSigUrl);

  return {
    getRearCameraStreamIndexUrl: () => videoserverBaseUrl + '/index.m3u8',
    getFrontCameraStreamIndexUrl: () => videoserverBaseUrl + '/dcamera/index.m3u8',
    getQcameraStreamIndexUrl: () => routeSigUrl + '/qcamera.m3u8',
    getRearCameraStreamIndex: () => videoserverRequest.get('index.m3u8', null, false, false),
    getFrontCameraStreamIndexPath: () => videoserverRequest.get('dcamera/index.m3u8', null, false, false),
    getQcameraStreamIndex: () =>  storageRequest.get('qcamera.m3u8', null, false, false),
  }
}
