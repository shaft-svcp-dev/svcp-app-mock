import { authCookieValue } from '~/mocks/login'

export default defineNuxtRouteMiddleware((to) => {
  const authenticated = useAuthCookie()
  const isLoginRoute = to.path === '/login'

  // 未ログインではサイドバー付き画面を出さない。ログイン済みでログイン画面に戻らない
  if (authenticated.value !== authCookieValue && !isLoginRoute) {
    return navigateTo('/login')
  }

  if (authenticated.value === authCookieValue && isLoginRoute) {
    return navigateTo('/')
  }
})
