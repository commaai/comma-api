import ConfigRequest from './instance';


export default function routeApi(routeSigUrl: string) {
  const request = new ConfigRequest(routeSigUrl);

  return {
    getCoords: async (cacheKey = 0) => request.get(`route.coords?s=${cacheKey}`),
    getJpegUrl: (routeOffsetSeconds: number) => `${routeSigUrl}/sec/${routeOffsetSeconds.toString()}.jpg`,
  };
}
