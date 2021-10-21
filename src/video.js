import ConfigRequest from './instance';

export default function videoApi(routeSigUrl) {
  const storageRequest = new ConfigRequest(routeSigUrl);

  return {
    getQcameraStreamIndexUrl: () => routeSigUrl + '/qcamera.m3u8',
    getQcameraStreamIndex: () =>  storageRequest.get('qcamera.m3u8', null, false, false),
  }
}
