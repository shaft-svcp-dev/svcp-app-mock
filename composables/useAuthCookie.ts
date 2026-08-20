import { authCookieName } from '~/mocks/login'

export function useAuthCookie() {
  // 既定の JSON decode だと "1" が数値になり、リクエスト Cookie と一致しなくなる
  return useCookie(authCookieName, {
    encode: value => encodeURIComponent(String(value ?? '')),
    decode: value => decodeURIComponent(value),
  })
}
