import qs from 'query-string';
export class RequestError extends Error {
  constructor(resp) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    super(...params);
    this.resp = resp;
  }
}
export default class ConfigRequest {
  constructor(baseUrl) {
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
    this.baseUrl = baseUrl + (!baseUrl.endsWith('/') ? '/' : '');
    this.errorResponseCallback = null;
  }
  configure(accessToken) {
    let errorResponseCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (accessToken) {
      this.defaultHeaders.Authorization = `JWT ${accessToken}`;
    }
    if (errorResponseCallback) {
      this.errorResponseCallback = errorResponseCallback;
    }
  }
  async request(method, endpoint, params) {
    let dataJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    let respJson = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    const headers = {
      ...this.defaultHeaders
    };
    if (!dataJson) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    let requestUrl = this.baseUrl + endpoint;
    let body;
    if (params && Object.keys(params).length !== 0) {
      if (method === 'GET' || method === 'HEAD') {
        requestUrl += `?${qs.stringify(params)}`;
      } else if (dataJson) {
        body = JSON.stringify(params);
      } else {
        body = qs.stringify(params);
      }
    }
    const resp = await fetch(requestUrl, {
      method,
      headers,
      body
    });
    if (!resp.ok) {
      if (this.errorResponseCallback) {
        await this.errorResponseCallback(resp);
        return null;
      }
      const error = await resp.text();
      throw new RequestError(resp, `${resp.status}: ${error}`);
    }
    if (!respJson) {
      return resp;
    }
    return resp.json();
  }
  async get(endpoint, params) {
    let dataJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let respJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return this.request('GET', endpoint, params, dataJson, respJson);
  }
  async head(endpoint, params) {
    let dataJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let respJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return this.request('HEAD', endpoint, params, dataJson, respJson);
  }
  async post(endpoint, params) {
    let dataJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let respJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return this.request('POST', endpoint, params, dataJson, respJson);
  }
  async postForm(endpoint, params) {
    return this.post(endpoint, params, false);
  }
  async put(endpoint, params) {
    let dataJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let respJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return this.request('PUT', endpoint, params, dataJson, respJson);
  }
  async delete(endpoint, params) {
    let dataJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let respJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return this.request('DELETE', endpoint, params, dataJson, respJson);
  }
  async patch(endpoint, params) {
    let dataJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    let respJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return this.request('PATCH', endpoint, params, dataJson, respJson);
  }
}