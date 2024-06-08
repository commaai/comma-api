import ConfigRequest from './instance';
export default function routeApi(routeSigUrl) {
  const request = new ConfigRequest(routeSigUrl);
  return {
    getCoords: async function () {
      let cacheKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return request.get(`route.coords?s=${cacheKey}`);
    },
    getJpegUrl: routeOffsetSeconds => `${routeSigUrl}/sec/${routeOffsetSeconds.toString()}.jpg`
  };
}