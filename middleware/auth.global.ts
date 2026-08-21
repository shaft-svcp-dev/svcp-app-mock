import { authCookieValue, loginPath, passwordResetPath, signupPath } from '~/mocks/login'
import { passwordResetSentPath } from '~/mocks/password-reset'

export default defineNuxtRouteMiddleware((to) => {
  const authenticated = useAuthCookie()
  const isPublicAuthRoute = [loginPath, signupPath, passwordResetPath, passwordResetSentPath]
    .includes(to.path)

  // 未ログインではサイドバー付き画面を出さない。ログイン済みで認証前画面に戻らない
  if (authenticated.value !== authCookieValue && !isPublicAuthRoute) {
    return navigateTo(loginPath)
  }

  if (authenticated.value === authCookieValue && isPublicAuthRoute) {
    return navigateTo('/')
  }
})
