import Config from './config'
import ConfigRequest from './instance'

const request = new ConfigRequest(Config.COMMA_API_URL)

export function getQcameraStreamUrl(routeStr: string, exp: string, sig: string) {
  return `${request.baseUrl}v1/route/${routeStr}/qcamera.m3u8?${new URLSearchParams({ exp, sig })}`
}
