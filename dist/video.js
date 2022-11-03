import qs from 'query-string';
import Config from './config';
import ConfigRequest from './instance';
var request = new ConfigRequest(Config.COMMA_URL_ROOT);
export function getQcameraStreamUrl(routeStr, exp, sig) {
  var query = qs.stringify({
    exp: exp,
    sig: sig
  });
  return "".concat(request.baseUrl, "v1/route/").concat(routeStr, "/qcamera.m3u8?").concat(query);
}