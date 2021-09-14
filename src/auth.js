import * as request from './request';

export async function refreshAccessToken(code, provider) {
  const resp = await request.postForm('v2/auth/', { code, provider });

  if (resp.access_token != null) {
    request.configure(resp.access_token);
    return resp.access_token;
  } else if (resp.response !== undefined) {
    throw new Error('Could not exchange oauth code for access token: response ' + resp.response.status);
  } else {
    throw new Error('Could not exchange oauth code for access token: response ' + authResponseText);
  }
}
