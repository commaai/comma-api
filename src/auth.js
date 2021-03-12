import * as request from './request';

export async function refreshAccessToken(code, redirect_uri, provider) {
  const authResponseText = await request.postForm('v2/auth/', { code, redirect_uri, provider });
  const resp = JSON.parse(authResponseText);

  if (resp.access_token != null) {
    await request.configure(resp.access_token);
    return resp.access_token;
  } else if (resp.response !== undefined) {
    throw new Error('Could not exchange oauth code for access token: response ' + resp.response.status);
  } else {
    throw new Error('Could not exchange oauth code for access token: response ' + authResponseText);
  }
}

