import { isAuthenticated } from '~/mocks/login'
import {
  dashboardPath,
  loginPath,
  passwordResetPath,
  passwordResetSentPath,
  signupPath,
} from '~/routes'

export default defineNuxtRouteMiddleware((to) => {
  // localStorage はサーバーに無い。未ログイン判定とリダイレクトはブラウザだけで行う
  if (import.meta.server) {
    return
  }

  const authenticated = useAuthStorage()
  const isLoggedIn = isAuthenticated(authenticated.value)
  const isPublicAuthRoute = [loginPath, signupPath, passwordResetPath, passwordResetSentPath]
    .includes(to.path)

  // 未ログインではサイドバー付き画面を出さない
  if (!isLoggedIn && !isPublicAuthRoute) {
    return navigateTo(loginPath)
  }

  // ログイン済みで認証前画面に戻らない
  if (isLoggedIn && isPublicAuthRoute) {
    return navigateTo(dashboardPath)
  }
})
