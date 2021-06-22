import ConfigRequest from './instance';
import qs from 'querystringify';

import defaultErrorHandler from './errorHandler';
import { COMMA_URL_ROOT } from './config';

const request = ConfigRequest();
let _errorHandlerFn = defaultErrorHandler;

var initPromise;
function ensureInit() {
  if (!initPromise) {
    initPromise = configure();
  }
  return initPromise;
}

export function configure(accessToken, errorHandler) {
  const config = {
    baseUrl: COMMA_URL_ROOT,
    jwt: false,
    parse: null,
  };

  if (accessToken) {
    config.token = `JWT ${accessToken}`;
  }

  if (errorHandler) {
    _errorHandlerFn = errorHandler;
  } else {
    _errorHandlerFn = defaultErrorHandler;
  }

  request.configure(config);
  initPromise = Promise.resolve();
  return initPromise;
}

export async function get(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.get(
      endpoint,
      {
        query: data,
        json: true
      },
      _errorHandlerFn(resolve, reject)
    );
  });
}

export async function post(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.post(
      endpoint,
      {
        body: data,
        json: true
      },
      _errorHandlerFn(resolve, reject)
    );
  });
}

export async function postForm(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.post(
      endpoint,
      {
        body: qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      },
      _errorHandlerFn(resolve, reject)
    )
  });
}

export async function patch(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.patch(
      endpoint,
      {
        body: data,
        json: true
      },
      _errorHandlerFn(resolve, reject)
    );
  });
}

export async function put(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.put(
      endpoint,
      {
        body: data,
        json: true
      },
      _errorHandlerFn(resolve, reject)
    );
  });
}

export async function del(endpoint, data) {
  await ensureInit();
  return new Promise((resolve, reject) => {
    request.delete(
      endpoint,
      {
        body: data,
        json: true
      },
      _errorHandlerFn(resolve, reject)
    );
  });
}
