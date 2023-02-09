import request from '../request'

import * as config from './config'
import * as storage from './storage'

export async function refreshAccessToken(code: string, provider: string): Promise<string> {
  const resp = await request.postForm('v2/auth/', { code, provider })

  if (resp.access_token != null) {
    request.setDefaultHeader('Authorization', resp.access_token)
    return resp.access_token
  } if (resp.response !== undefined) {
    throw new Error(`Could not exchange oauth code for access token: response ${resp.response}`)
  } else if (resp.error !== undefined) {
    throw new Error(`Could not exchange oauth code for access token: error ${resp.error}`)
  } else {
    throw new Error(`Could not exchange oauth code for access token: ${resp}`)
  }
}

export function isSignedIn(): boolean {
  return storage.getAccessToken() != null
}

export function getAccessToken(): string | null {
  return storage.getAccessToken()
}

export function signOut(): void {
  storage.clearAccessToken()
  request.removeDefaultHeader('Authorization')
}

export {
  config,
}
