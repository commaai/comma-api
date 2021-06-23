import ConfigRequest from './instance';

export default function routeApi(routeSigUrl) {
  const request = new ConfigRequest(routeSigUrl);

  return {
    getCoords: async () => await request.get('route.coords'),
    getJpegUrl: (routeOffsetSeconds) => routeSigUrl + '/sec/' + routeOffsetSeconds.toString() + '.jpg',
  }
}
