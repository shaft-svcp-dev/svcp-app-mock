import { authCookieValue, loginPath, signupPath } from '~/mocks/login'

export default defineNuxtRouteMiddleware((to) => {
  const authenticated = useAuthCookie()
  const isPublicAuthRoute = to.path === loginPath || to.path === signupPath

  // 未ログインではサイドバー付き画面を出さない。ログイン済みでログイン・会員登録に戻らない
  if (authenticated.value !== authCookieValue && !isPublicAuthRoute) {
    return navigateTo(loginPath)
  }

  if (authenticated.value === authCookieValue && isPublicAuthRoute) {
    return navigateTo('/')
  }
})
