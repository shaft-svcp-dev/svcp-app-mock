import { describe, expect, it } from 'vitest'

const commonComponents = import.meta.glob('../components/common/*.vue')
const dashboardComponents = import.meta.glob('../components/dashboard/*.vue')
const videoListComponents = import.meta.glob('../components/video-list/*.vue')
const videoDetailComponents = import.meta.glob('../components/video-detail/*.vue')
const videoDetailSources = import.meta.glob('../components/video-detail/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const uploadComponents = import.meta.glob('../components/upload/*.vue')
const rootComponents = import.meta.glob('../components/*.vue')
const layouts = import.meta.glob('../layouts/*.vue')
const videoPages = import.meta.glob('../pages/videos/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const uploadPage = import.meta.glob('../pages/upload.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const loginComponents = import.meta.glob('../components/login/*.vue')
const loginPage = import.meta.glob('../pages/login.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const signupComponents = import.meta.glob('../components/signup/*.vue')
const signupPage = import.meta.glob('../pages/signup.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const passwordResetComponents = import.meta.glob('../components/password-reset/*.vue')
const passwordResetPages = import.meta.glob('../pages/password-reset/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const settingsComponents = import.meta.glob('../components/settings/*.vue')
const settingsPage = import.meta.glob('../pages/settings.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const composableSources = import.meta.glob('../composables/*.ts', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const middlewareSources = import.meta.glob('../middleware/*.ts', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function fileNames(modules: Record<string, unknown>): string[] {
  return Object.keys(modules).map(path => path.split('/').at(-1) ?? path)
}

describe('component directories', () => {
  it('places shared components in components/common', () => {
    expect(fileNames(commonComponents).sort()).toEqual([
      'AppHeader.vue',
      'AppHeaderActions.vue',
      'AppIcon.vue',
      'AppSidebar.vue',
    ])
    expect(fileNames(rootComponents)).toEqual([])
  })

  it('places the shared sidebar and header shell in layouts', () => {
    expect(fileNames(layouts).sort()).toEqual(['default.vue'])
  })

  it('places dashboard page components in components/dashboard', () => {
    expect(fileNames(dashboardComponents).sort()).toEqual([
      'StatCard.vue',
      'VideoRow.vue',
    ])
  })

  it('places video list page components in components/video-list', () => {
    expect(fileNames(videoListComponents).sort()).toEqual([
      'FilterRow.vue',
      'Table.vue',
    ])
  })

  it('places video detail page components in components/video-detail', () => {
    expect(fileNames(videoDetailComponents).sort()).toEqual([
      'DeleteDialog.vue',
      'MetaInputs.vue',
      'Player.vue',
      'SidePane.vue',
      'SubtitleSettings.vue',
      'ThumbnailSettings.vue',
    ])
  })

  it('places upload page components in components/upload', () => {
    expect(fileNames(uploadComponents).sort()).toEqual([
      'ConversionPipeline.vue',
      'DropZone.vue',
      'FileInfo.vue',
    ])
  })

  it('copies the existing streamUrl and exposes copy success feedback in the side pane', () => {
    const source = Object.entries(videoDetailSources).find(([path]) => path.includes('SidePane'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain('navigator.clipboard.writeText(props.video.streamUrl)')
    expect(source).toContain('copySuccessLabel')
    expect(source).toContain('copied')
  })

  it('imports video-detail components from the dynamic detail page', () => {
    // 動的ルートでは自動解決がページ変換に乗らず本体が空になることがあるため、明示 import を契約にする
    const source = Object.entries(videoPages).find(([path]) => path.includes('[id]'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain("~/components/video-detail/Player.vue")
    expect(source).toContain("~/components/video-detail/MetaInputs.vue")
    expect(source).toContain("~/components/video-detail/SidePane.vue")
    expect(source).toContain("~/components/video-detail/DeleteDialog.vue")
    expect(source).toContain("~/components/video-detail/ThumbnailSettings.vue")
    expect(source).toContain("~/components/video-detail/SubtitleSettings.vue")
    expect(source).toContain('navigateTo(videoListPath)')
  })

  it('keeps video delete confirmation copy in the detail delete dialog', () => {
    const source = Object.entries(videoDetailSources).find(([path]) => path.includes('DeleteDialog'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain('deleteConfirmTitle')
    expect(source).toContain('deleteConfirmMessage')
    expect(source).toContain('deleteConfirmOkLabel')
    expect(source).toContain('deleteConfirmCancelLabel')
  })

  it('keeps thumbnail and subtitle settings as local UI state on the detail page', () => {
    const pageSource = Object.entries(videoPages).find(([path]) => path.includes('[id]'))?.[1]
    const thumbnailSource = Object.entries(videoDetailSources).find(([path]) => {
      return path.includes('ThumbnailSettings')
    })?.[1]
    const subtitleSource = Object.entries(videoDetailSources).find(([path]) => {
      return path.includes('SubtitleSettings')
    })?.[1]
    const playerSource = Object.entries(videoDetailSources).find(([path]) => {
      return path.includes('Player')
    })?.[1]

    expect(pageSource).toBeDefined()
    expect(thumbnailSource).toBeDefined()
    expect(subtitleSource).toBeDefined()
    expect(playerSource).toBeDefined()

    expect(pageSource).toContain('thumbnailSrc')
    expect(pageSource).toContain('subtitles')
    expect(thumbnailSource).toContain('URL.createObjectURL')
    expect(thumbnailSource).toContain('originalSrc')
    expect(subtitleSource).toContain('subtitleLanguageOptions')
    expect(subtitleSource).toContain('subtitleEmptyMessage')
    expect(subtitleSource).toContain('URL.createObjectURL')
    expect(playerSource).toContain('kind="subtitles"')
    expect(playerSource).toContain('<track')
  })

  it('imports upload components from the upload page', () => {
    // ページ名 Upload と prefix Upload* が重なると自動解決が乗らず、SSRとクライアントが食い違う
    const source = Object.values(uploadPage)[0]
    expect(source).toBeDefined()
    expect(source).toContain("~/components/upload/DropZone.vue")
    expect(source).toContain("~/components/upload/ConversionPipeline.vue")
    expect(source).toContain("~/components/upload/FileInfo.vue")
  })

  it('places login page components in components/login', () => {
    expect(fileNames(loginComponents).sort()).toEqual([
      'Branding.vue',
      'FormFields.vue',
      'Submit.vue',
    ])
  })

  it('imports login components from the login page without the shared chrome layout', () => {
    // ページ名 Login と prefix Login* が重なると自動解決が乗らず、SSRとクライアントが食い違う
    const source = Object.values(loginPage)[0]
    expect(source).toBeDefined()
    expect(source).toContain("~/components/login/Branding.vue")
    expect(source).toContain("~/components/login/FormFields.vue")
    expect(source).toContain("~/components/login/Submit.vue")
    expect(source).toContain('layout: false')
  })

  it('places signup page components in components/signup', () => {
    expect(fileNames(signupComponents).sort()).toEqual([
      'Branding.vue',
      'FormFields.vue',
      'Submit.vue',
      'TermsConsent.vue',
    ])
  })

  it('imports signup components from the signup page without the shared chrome layout', () => {
    // ページ名 Signup と prefix Signup* が重なると自動解決が乗らず、SSRとクライアントが食い違う
    const source = Object.values(signupPage)[0]
    expect(source).toBeDefined()
    expect(source).toContain("~/components/signup/Branding.vue")
    expect(source).toContain("~/components/signup/FormFields.vue")
    expect(source).toContain("~/components/signup/TermsConsent.vue")
    expect(source).toContain("~/components/signup/Submit.vue")
    expect(source).toContain('layout: false')
  })

  it('places password-reset page components in components/password-reset', () => {
    expect(fileNames(passwordResetComponents).sort()).toEqual([
      'Branding.vue',
      'FormFields.vue',
      'Submit.vue',
    ])
  })

  it('imports password-reset components from the form page without the shared chrome layout', () => {
    // ページ名 PasswordReset と prefix PasswordReset* が重なると自動解決が乗らず、SSRとクライアントが食い違う
    const source = Object.entries(passwordResetPages).find(([path]) => path.endsWith('index.vue'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain("~/components/password-reset/Branding.vue")
    expect(source).toContain("~/components/password-reset/FormFields.vue")
    expect(source).toContain("~/components/password-reset/Submit.vue")
    expect(source).toContain('layout: false')
    expect(source).toContain('navigateTo(passwordResetSentPath)')
  })

  it('keeps the password-reset sent page without the shared chrome layout', () => {
    const source = Object.entries(passwordResetPages).find(([path]) => path.endsWith('sent.vue'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain("~/components/password-reset/Branding.vue")
    expect(source).toContain('layout: false')
    expect(source).toContain('passwordResetSentTitle')
    expect(source).toContain('loginScreenLinkLabel')
  })

  it('places settings page components in components/settings', () => {
    expect(fileNames(settingsComponents).sort()).toEqual([
      'AccountInfo.vue',
      'DeleteDialog.vue',
      'MembershipStatus.vue',
      'PaymentCompleteDialog.vue',
      'PaymentForm.vue',
    ])
  })

  it('imports settings components from the settings page', () => {
    // ページ名 Settings と prefix Settings* が重なると自動解決が乗らず、SSRとクライアントが食い違う
    const source = Object.values(settingsPage)[0]
    expect(source).toBeDefined()
    expect(source).toContain("~/components/settings/AccountInfo.vue")
    expect(source).toContain("~/components/settings/DeleteDialog.vue")
    expect(source).toContain("~/components/settings/MembershipStatus.vue")
    expect(source).toContain("~/components/settings/PaymentForm.vue")
    expect(source).toContain("~/components/settings/PaymentCompleteDialog.vue")
    expect(source).toContain('registeredAccount')
    expect(source).toContain('maskEmail')
    expect(source).toContain('authenticated.value = null')
    expect(source).toContain('navigateTo(loginPath)')
    expect(source).toContain('markPaid')
    expect(source).toContain('paymentCompleteOpen')
  })

  it('gates video delete and multi-file upload on paid membership', () => {
    const detailSource = Object.entries(videoPages).find(([path]) => path.includes('[id]'))?.[1]
    const uploadSource = Object.values(uploadPage)[0]

    expect(detailSource).toBeDefined()
    expect(detailSource).toContain('isPaid')
    expect(detailSource).toContain('v-if="isPaid"')
    expect(detailSource).toContain('markDeleted')

    expect(uploadSource).toBeDefined()
    expect(uploadSource).toContain('isPaid')
    expect(uploadSource).toContain('limitSelectedFiles')
    expect(uploadSource).toContain(':multiple="isPaid"')
  })

  it('stores auth and membership in localStorage instead of cookies', () => {
    expect(fileNames(composableSources).sort()).toEqual([
      'useAuthStorage.ts',
      'useClientStorage.ts',
      'useDeletedVideoIds.ts',
      'useMembership.ts',
    ])

    const authSource = Object.entries(composableSources).find(([path]) => {
      return path.endsWith('useAuthStorage.ts')
    })?.[1]
    const membershipSource = Object.entries(composableSources).find(([path]) => {
      return path.endsWith('useMembership.ts')
    })?.[1]
    const clientStorageSource = Object.entries(composableSources).find(([path]) => {
      return path.endsWith('useClientStorage.ts')
    })?.[1]
    const middlewareSource = Object.entries(middlewareSources).find(([path]) => {
      return path.endsWith('auth.global.ts')
    })?.[1]
    const loginSource = Object.values(loginPage)[0]
    const signupSource = Object.values(signupPage)[0]

    expect(clientStorageSource).toBeDefined()
    expect(clientStorageSource).toContain('localStorage.getItem')
    expect(clientStorageSource).toContain('localStorage.setItem')
    expect(clientStorageSource).toContain('localStorage.removeItem')
    expect(clientStorageSource).not.toContain('useCookie')

    expect(authSource).toBeDefined()
    expect(authSource).toContain('useClientStorage')
    expect(authSource).toContain('authStorageKey')
    expect(authSource).not.toContain('useCookie')

    expect(membershipSource).toBeDefined()
    expect(membershipSource).toContain('useClientStorage')
    expect(membershipSource).toContain('membershipStorageKey')
    expect(membershipSource).not.toContain('useCookie')

    expect(middlewareSource).toBeDefined()
    expect(middlewareSource).toContain('import.meta.server')
    expect(middlewareSource).toContain('useAuthStorage')
    expect(middlewareSource).toContain('isAuthenticated')
    expect(middlewareSource).not.toContain('useCookie')
    expect(middlewareSource).not.toContain('useAuthCookie')

    expect(loginSource).toContain('useAuthStorage')
    expect(loginSource).toContain('authStorageValue')
    expect(signupSource).toContain('useAuthStorage')
    expect(signupSource).toContain('authStorageValue')
  })
})
