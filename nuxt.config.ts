import { readNuxtAppBaseURL, resolveAppBaseURL } from './app-base-url'
import { prerenderRoutes } from './prerender-routes'

const githubPagesBaseURL = readNuxtAppBaseURL()

export default defineNuxtConfig({
  compatibilityDate: '2026-08-20',
  devtools: {
    enabled: true,
  },
  css: [
    '~/assets/css/dashboard.css',
    '~/assets/css/video-list.css',
    '~/assets/css/video-detail.css',
    '~/assets/css/upload.css',
    '~/assets/css/login.css',
    '~/assets/css/signup.css',
    '~/assets/css/password-reset.css',
    '~/assets/css/settings.css',
  ],
  components: [
    {
      path: '~/components/common',
      // 共通コンポーネントはディレクトリ名を接頭辞にせず <AppIcon> のまま使う
      pathPrefix: false,
    },
    {
      path: '~/components/dashboard',
      // ページ専用コンポーネントは <DashboardHeader> のようにページ名を接頭辞にする
      prefix: 'Dashboard',
    },
    {
      path: '~/components/video-list',
      prefix: 'VideoList',
    },
    {
      path: '~/components/video-detail',
      prefix: 'VideoDetail',
    },
    {
      path: '~/components/upload',
      prefix: 'Upload',
    },
    {
      path: '~/components/login',
      prefix: 'Login',
    },
    {
      path: '~/components/signup',
      prefix: 'Signup',
    },
    {
      path: '~/components/password-reset',
      prefix: 'PasswordReset',
    },
    {
      path: '~/components/settings',
      prefix: 'Settings',
    },
  ],
  app: {
    // 未設定時はローカルの / 。GitHub Actions がリポジトリ名を NUXT_APP_BASE_URL に渡す
    baseURL: resolveAppBaseURL(githubPagesBaseURL),
    head: {
      title: 'ダッシュボード | SVCP',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
  // 常時 prerender すると /videos の静的 HTML が ?status= を潰し、通常の SSR / e2e が壊れる
  nitro: githubPagesBaseURL
    ? {
        prerender: {
          crawlLinks: true,
          routes: prerenderRoutes,
        },
      }
    : undefined,
})
