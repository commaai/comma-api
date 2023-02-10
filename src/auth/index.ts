import request from '../request'

import * as config from './config'
import { clearAccessToken, getAccessToken, setAccessToken } from './storage'

export async function refreshAccessToken(code: string, provider: string): Promise<string> {
  const resp = await request.postForm('v2/auth/', { code, provider })

  if (resp.access_token != null) {
    request.setAuthorization(resp.access_token)
    setAccessToken(resp.access_token)
    return resp.access_token
  } else if (resp.response !== undefined) {
    throw new Error(`Could not exchange oauth code for access token: response ${resp.response}`)
  } else if (resp.error !== undefined) {
    throw new Error(`Could not exchange oauth code for access token: error ${resp.error}`)
  } else {
    throw new Error(`Could not exchange oauth code for access token: ${resp}`)
  }
}

export function isSignedIn(): boolean {
  return getAccessToken() != null
}

export function signOut(): void {
  clearAccessToken()
  request.clearAuthorization()
}

export {
  config,
}
