export class RequestError extends Error {
  resp: Response

  constructor(resp: Response, message?: string) {
    super(message)
    this.resp = resp
  }
}

export default class ConfigRequest {
  baseUrl: string
  defaultHeaders: Headers

  constructor(baseUrl: string) {
    this.defaultHeaders = new Headers({
      'Content-Type': 'application/json',
    })
    this.baseUrl = baseUrl + (!baseUrl.endsWith('/') ? '/' : '')
  }

  setAuthorization(token: string) {
    this.defaultHeaders.set('Authorization', `JWT ${token}`)
  }

  clearAuthorization() {
    this.defaultHeaders.delete('Authorization')
  }

  async request(method: string, endpoint: string, params?: Record<string, any>, dataJson = true, respJson = true) {
    const headers = new Headers(this.defaultHeaders)
    if (!dataJson) {
      headers.set('Content-Type', 'application/x-www-form-urlencoded')
    }

    let requestUrl = this.baseUrl + endpoint
    let body = null
    if (params && Object.keys(params).length !== 0) {
      if (method === 'GET' || method === 'HEAD') {
        requestUrl += `?${new URLSearchParams(params)}`
      } else if (dataJson) {
        body = JSON.stringify(params)
      } else {
        body = new URLSearchParams(params).toString()
      }
    }

    const resp = await fetch(requestUrl, { method, headers, body })
    if (!resp.ok) {
      const error = await resp.text()
      throw new RequestError(resp, `${resp.status}: ${error}`)
    }
    if (!respJson) {
      return resp
    }
    return resp.json()
  }

  async get(endpoint: string, params?: Record<string, any>, dataJson = true, respJson = true) {
    return this.request('GET', endpoint, params, dataJson, respJson)
  }

  async head(endpoint: string, params?: Record<string, any>, dataJson = true, respJson = true) {
    return this.request('HEAD', endpoint, params, dataJson, respJson)
  }

  async post(endpoint: string, params?: Record<string, any>, dataJson = true, respJson = true) {
    return this.request('POST', endpoint, params, dataJson, respJson)
  }

  async postForm(endpoint: string, params?: Record<string, any>) {
    return this.post(endpoint, params, false)
  }

  async put(endpoint: string, params?: Record<string, any>, dataJson = true, respJson = true) {
    return this.request('PUT', endpoint, params, dataJson, respJson)
  }

  async delete(endpoint: string, params?: Record<string, any>, dataJson = true, respJson = true) {
    return this.request('DELETE', endpoint, params, dataJson, respJson)
  }

  async patch(endpoint: string, params?: Record<string, any>, dataJson = true, respJson = true) {
    return this.request('PATCH', endpoint, params, dataJson, respJson)
  }
}
