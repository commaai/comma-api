import * as request from './request';

export async function refreshAccessToken(code) {
  const authResponseText = await request.postForm('v2/auth/', { code });
  const resp = JSON.parse(authResponseText);
  if (resp !== undefined) {
    if (resp.access_token != null) {
      await request.configure(resp.access_token);
      return resp.access_token;
    } else if (resp.response !== undefined) {
      throw new Error('Could not exchange idToken for access token: response ' + resp.response.status);
    }
  }
  throw new Error('Could not exchange idToken for access token: response undefined.');
}

