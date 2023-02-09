let service = 'localhost:3000'
if (typeof window !== 'undefined') {
  service = window.location.host
}

function stringify(obj: Record<string, string>) {
  return new URLSearchParams(obj).toString()
}

const GOOGLE_OAUTH_PARAMS = {
  type: 'web_server',
  client_id:
    '45471411055-ornt4svd2miog6dnopve7qtmh5mnu6id.apps.googleusercontent.com',
  redirect_uri: 'https://api.comma.ai/v2/auth/g/redirect/',
  response_type: 'code',
  scope: 'https://www.googleapis.com/auth/userinfo.email',
  state: 'service,' + service,
  prompt: 'select_account',
}
export const GOOGLE_REDIRECT_LINK =
  'https://accounts.google.com/o/oauth2/auth?' + stringify(GOOGLE_OAUTH_PARAMS)

const APPLE_OAUTH_PARAMS = {
  client_id: 'ai.comma.login',
  redirect_uri: 'https://api.comma.ai/v2/auth/a/redirect/',
  response_type: 'code',
  response_mode: 'form_post',
  scope: 'name email',
  state: 'service,' + service,
}
export const APPLE_REDIRECT_LINK =
  'https://appleid.apple.com/auth/authorize?' + stringify(APPLE_OAUTH_PARAMS)

const GITHUB_OAUTH_PARAMS = {
  client_id: '28c4ecb54bb7272cb5a4',
  redirect_uri: 'https://api.comma.ai/v2/auth/h/redirect/',
  scope: 'read:user',
  state: 'service,' + service,
}
export const GITHUB_REDIRECT_LINK =
  'https://github.com/login/oauth/authorize?' + stringify(GITHUB_OAUTH_PARAMS)
