export default defineNuxtConfig({
  compatibilityDate: '2026-08-20',
  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/dashboard.css'],
  app: {
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
})
