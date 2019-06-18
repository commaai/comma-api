import urlJoin from 'url-join';
import ConfigRequestPromise from './config-request-promise';

export default function routeApi(routeSigUrl) {
  const request = ConfigRequestPromise();
  const baseUrl = routeSigUrl + '/';
  request.configure({
    baseUrl,
    parse: null,
  })

  return {
    getCoords: async function() {
      const coords = await request.get('route.coords');
      return JSON.parse(coords);
    },
    getJpegUrl: function(routeOffsetSeconds) {
      return urlJoin(baseUrl, 'sec' + routeOffsetSeconds.toString() + '.jpg')
    },
  }
}
