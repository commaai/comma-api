import qs from 'query-string';


export class RequestError extends Error {
  constructor(resp, ...params) {
    super(...params);
    this.resp = resp;
  }
}

export default class ConfigRequest {
  constructor(baseUrl, unauthorizedHandler = null) {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.baseUrl = baseUrl + (!baseUrl.endsWith('/') ? '/' : '');
    this.unauthorizedHandler = unauthorizedHandler;
  }

  configure(accessToken) {
    if (accessToken) {
      this.defaultHeaders.Authorization = `JWT ${accessToken}`;
    }
  }

  async request(method, endpoint, params, dataJson = true, respJson = true) {
    const headers = { ...this.defaultHeaders };
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

    const resp = await fetch(requestUrl, { method, headers, body });
    if (!resp.ok) {
      if (resp.status === 401 && this.unauthorizedHandler) {
        await this.unauthorizedHandler();
      }
      const error = await resp.text();
      throw new RequestError(resp, `${resp.status}: ${error}`);
    }
    if (!respJson) {
      return resp;
    }
    return resp.json();
  }

  async get(endpoint, params, dataJson = true, respJson = true) {
    return this.request('GET', endpoint, params, dataJson, respJson);
  }

  async head(endpoint, params, dataJson = true, respJson = true) {
    return this.request('HEAD', endpoint, params, dataJson, respJson);
  }

  async post(endpoint, params, dataJson = true, respJson = true) {
    return this.request('POST', endpoint, params, dataJson, respJson);
  }

  async postForm(endpoint, params) {
    return this.post(endpoint, params, false);
  }

  async put(endpoint, params, dataJson = true, respJson = true) {
    return this.request('PUT', endpoint, params, dataJson, respJson);
  }

  async delete(endpoint, params, dataJson = true, respJson = true) {
    return this.request('DELETE', endpoint, params, dataJson, respJson);
  }

  async patch(endpoint, params, dataJson = true, respJson = true) {
    return this.request('PATCH', endpoint, params, dataJson, respJson);
  }
}
