const AUTH_KEY = 'ai.comma.api.authorization'

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(AUTH_KEY)
}

export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(AUTH_KEY, token)
}

export function clearAccessToken(): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.removeItem(AUTH_KEY)
}
