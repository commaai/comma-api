import qs from 'query-string';

export default class ConfigRequest {
  constructor(baseUrl) {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.baseUrl = baseUrl + (!baseUrl.endsWith('/') ? '/' : '');
  }

  configure(accessToken) {
    if (accessToken) {
      this.defaultHeaders['Authorization'] = `JWT ${accessToken}`;
    }
  }

  async request(method, path, params, data_json, resp_json) {
    if (data_json !== false) {
      data_json = true;
    }
    if (resp_json !== false) {
      resp_json = true;
    }

    let headers = { ...this.defaultHeaders };
    if (!data_json) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    let requestUrl = this.baseUrl + path;
    let body = undefined;
    if (params && Object.keys(params).length !== 0) {
      if (method === 'GET' || method === 'HEAD') {
        requestUrl += '?' + qs.stringify(params);
      } else if (data_json) {
        body = JSON.stringify(params);
      } else {
        body = qs.stringify(params);
      }
    }

    const resp = await fetch(requestUrl, { method, headers, body });
    if (!resp_json) {
      return resp;
    }
    return await resp.json();
  }
}

['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'].forEach((method) => {
  const methodName = method.toLowerCase();
  ConfigRequest.prototype[methodName] = async function(path, params, data_json, resp_json) {
    return await this.request(method, path, params, data_json, resp_json);
  };
});
