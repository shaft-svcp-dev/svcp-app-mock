import { videoListItems } from './mocks/videos'
import {
  dashboardPath,
  loginPath,
  passwordResetPath,
  passwordResetSentPath,
  settingsPath,
  signupPath,
  uploadPath,
  videoListPath,
} from './routes'

// ログイン画面は未ログイン時の入口で、ダッシュボードからのクロールでは辿れない
export const prerenderRoutes = [
  dashboardPath,
  loginPath,
  signupPath,
  passwordResetPath,
  passwordResetSentPath,
  videoListPath,
  uploadPath,
  settingsPath,
  ...videoListItems.map(item => `${videoListPath}/${item.id}`),
]
