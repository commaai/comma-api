import ConfigRequest from './instance';

export default function routeApi(routeSigUrl) {
  const request = new ConfigRequest(routeSigUrl);

  return {
    getCoords: async (cache_key=0) => await request.get(`route.coords?s=${cache_key}`),
    getJpegUrl: (routeOffsetSeconds) => routeSigUrl + '/sec/' + routeOffsetSeconds.toString() + '.jpg',
  }
}
