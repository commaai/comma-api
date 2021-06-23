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

  async request(method, path, params, use_json) {
    console.log(this);
    if (use_json !== false) {
      use_json = true;
    }

    let requestUrl = this.baseUrl + path;
    let headers = { ...this.defaultHeaders };
    let body = undefined;
    if (method === 'get' && method === 'head') {
      requestUrl += '?' + qs.stringify(params);
    } else if (use_json) {
      body = JSON.stringify(params);
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      body = qs.stringify(params);
    }

    console.log(requestUrl, method, headers, body);
    const resp = await fetch(requestUrl, { method, headers, body });
    return await resp.json();
  }
}

['get', 'post', 'put', 'patch', 'head', 'delete'].forEach((method) => {
  ConfigRequest.prototype[method] = async function(path, params, use_json) {
    return await this.request(method, path, params, use_json);
  };
});
