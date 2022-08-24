import qs from 'query-string';

import { COMMA_URL_ROOT } from './config';
import ConfigRequest from './instance';

let request = new ConfigRequest(COMMA_URL_ROOT);

export function getQcameraStreamUrl(route_str, exp, sig) {
  return `${request.baseUrl}v1/route/${route_str}/qcamera.m3u8?${qs.stringify({ exp, sig })}`;
}
