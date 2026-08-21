import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'
import {
  dashboardNavLabel,
  dashboardTitle,
  logoutButtonLabel,
  mainNavAriaLabel,
  productName,
  recentSectionTitle,
  totalPlayCountStatLabel,
  totalVideosStatLabel,
  uploadButtonLabel,
  videoStatusLabel,
  viewAllLabel,
} from '../constants/dashboard'
import {
  emailFieldLabel,
  emailPlaceholder,
  forgotPasswordLinkLabel,
  forgotPasswordPromptLabel,
  loginButtonLabel,
  loginTagline,
  passwordFieldLabel,
  passwordPlaceholder,
  signupLinkLabel,
  signupPromptLabel,
} from '../constants/login'
import {
  loginScreenLinkLabel,
  passwordResetButtonLabel,
  passwordResetSentTitle,
  passwordResetTitle,
} from '../constants/password-reset'
import {
  accountSectionTitle,
  cardCvcFieldLabel,
  cardExpiryFieldLabel,
  cardHolderFieldLabel,
  cardNumberFieldLabel,
  cardNumberPlaceholder,
  deleteAccountButtonLabel,
  deleteAccountConfirmCancelLabel,
  deleteAccountConfirmMessage,
  deleteAccountConfirmOkLabel,
  deleteAccountConfirmTitle,
  freeMemberLabel,
  membershipSectionTitle,
  paidMemberLabel,
  payButtonLabel,
  paymentCompleteConfirmLabel,
  paymentCompleteTitle,
  paymentSectionDescription,
  paymentSectionTitle,
  settingsTitle,
} from '../constants/settings'
import {
  companyFieldLabel,
  companyPlaceholder,
  fullNameFieldLabel,
  fullNamePlaceholder,
  loginLinkLabel,
  passwordConfirmFieldLabel,
  requiredFieldLabel,
  signupButtonLabel,
  signupTagline,
  signupTitle,
  termsConsentLabel,
} from '../constants/signup'
import {
  conversionPipelineNote,
  conversionPipelineTitle,
  conversionProgressLabel,
  conversionStepLabel,
  dropZoneSubtitle,
  dropZoneTitle,
  freeUploadLimitNote,
  paidUploadMultipleNote,
  selectFileButtonLabel,
} from '../constants/upload'
import {
  cancelButtonLabel,
  copyButtonLabel,
  copySuccessLabel,
  deleteConfirmMessage,
  deleteConfirmTitle,
  descriptionFieldLabel,
  metadataSectionTitle,
  metadataRowLabels,
  publishToggleLabel,
  saveButtonLabel,
  streamUrlSectionTitle,
  subtitleEmptyMessage,
  subtitleHint,
  subtitleLanguageOptions,
  subtitleSectionTitle,
  subtitleUploadLabel,
  thumbnailHint,
  thumbnailResetLabel,
  thumbnailSectionTitle,
  thumbnailUploadLabel,
  titleFieldLabel,
  videoDetailTitle,
  visibilitySectionTitle,
} from '../constants/video-detail'
import {
  searchPlaceholder,
  sortButtonLabel,
  statusFilterOptions,
  videoListTitle,
  videoTableColumns,
} from '../constants/videos'
import { dashboardUser, recentUploads } from '../mocks/dashboard'
import {
  authStorageValue,
  isAuthenticated,
} from '../mocks/login'
import {
  isPaidMembership,
  maskEmail,
  paidMembershipValue,
  registeredAccount,
} from '../mocks/settings'
import {
  conversionProgressPercent,
  conversionSteps,
  formatFileSize,
  freeUploadLimit,
  limitSelectedFiles,
  uploadingFile,
  videoFileAccept,
} from '../mocks/upload'
import {
  subtitleFileAccept,
  thumbnailFileAccept,
  videoPlaybackSrc,
} from '../mocks/video-detail'
import {
  excludeDeletedVideos,
  parseDeletedVideoIds,
  videoListItems,
} from '../mocks/videos'
import {
  loginPath,
  passwordResetPath,
  passwordResetSentPath,
  settingsPath,
  signupPath,
  videoListPath,
} from '../routes'

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function firstAnchorWithHref(html: string, href: string): string | undefined {
  return html.match(new RegExp(`<a[^>]*href="${escapeRegExp(href)}"[^>]*>`))?.[0]
}

async function stylesheetText(html: string): Promise<string> {
  const hrefs = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(match => match[1])
  const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(match => match[1])
  const linked = await Promise.all(hrefs.map(href => $fetch<string>(href).catch(() => '')))
  return [...inline, ...linked].join('\n')
}

function fetchPage(path: string) {
  return $fetch<string>(path)
}

function headerActionsHtml(html: string): string {
  return html.match(/<div class="header-actions">[\s\S]*?<\/div>/)?.[0] ?? ''
}

function dialogHtml(html: string): string {
  return html.match(/<(?:div|dialog)[^>]*role="dialog"[^>]*>[\s\S]*?<\/(?:div|dialog)>/)?.[0] ?? ''
}

function elementOpeningTag(html: string, className: string): string | undefined {
  return html.match(
    new RegExp(`<[^>]*\\bclass="[^"]*\\b${escapeRegExp(className)}\\b[^"]*"[^>]*>`),
  )?.[0]
}

function switchButtonOpeningTag(html: string): string | undefined {
  return html.match(/<button\b[^>]*role="switch"[^>]*>/)?.[0]
    ?? html.match(/<button\b[^>]*aria-checked="(?:true|false)"[^>]*>/)?.[0]
}

function statValues(html: string): string[] {
  return [...html.matchAll(/<span class="stat-value">([^<]*)<\/span>/g)].map(match => match[1])
}

function statCardByLabel(html: string, label: string): string | undefined {
  const cards = html.match(
    /<(?:a|article)\b[^>]*class="[^"]*\bstat-card\b[^"]*"[^>]*>[\s\S]*?<\/(?:a|article)>/g,
  ) ?? []
  return cards.find(card => card.includes(`<span class="stat-label">${label}</span>`))
}

function selectedOptionValue(html: string): string | undefined {
  return html.match(/<option[^>]*value="([^"]*)"[^>]*selected/)?.[1]
    ?? html.match(/<option[^>]*selected[^>]*value="([^"]*)"/)?.[1]
}

function accountInfoHtml(html: string): string {
  return html.match(/<section[^>]*class="[^"]*\baccount-info\b[^"]*"[^>]*>[\s\S]*?<\/section>/)?.[0] ?? ''
}

function membershipStatusHtml(html: string): string {
  return html.match(/<section[^>]*class="[^"]*\bmembership-status\b[^"]*"[^>]*>[\s\S]*?<\/section>/)?.[0] ?? ''
}

function enclosingAnchorOpeningTag(html: string, className: string): string | undefined {
  const imgMatch = html.match(
    new RegExp(`<img\\b[^>]*\\bclass="[^"]*\\b${escapeRegExp(className)}\\b[^"]*"[^>]*>`),
  )
  if (!imgMatch || imgMatch.index === undefined) {
    return undefined
  }

  const before = html.slice(0, imgMatch.index)
  const lastAnchor = before.lastIndexOf('<a')
  const lastCloseAnchor = before.lastIndexOf('</a>')
  if (lastAnchor < 0 || lastAnchor < lastCloseAnchor) {
    return undefined
  }

  const tagEnd = html.indexOf('>', lastAnchor)
  return html.slice(lastAnchor, tagEnd + 1)
}

describe('SVCP mock screens', async () => {
  await setup({
    rootDir: '.',
  })

  it('renders the login screen from mock data without the shared chrome', async () => {
    const html = await $fetch<string>('/login')

    expect(html).toContain(productName)
    expect(html).not.toContain('VideoHub')
    expect(html).toContain(loginTagline)
    expect(html).toContain(emailFieldLabel)
    expect(html).toContain(passwordFieldLabel)
    expect(html).toContain(emailPlaceholder)
    expect(html).toContain(passwordPlaceholder)
    expect(html).toContain(loginButtonLabel)
    expect(html).toContain(signupPromptLabel)
    expect(html).toContain(signupLinkLabel)
    expect(firstAnchorWithHref(html, signupPath)).toBeDefined()
    expect(html).toContain(forgotPasswordPromptLabel)
    expect(html).toContain(forgotPasswordLinkLabel)
    expect(firstAnchorWithHref(html, passwordResetPath)).toBeDefined()
    expect(html.indexOf(signupLinkLabel)).toBeLessThan(html.indexOf(forgotPasswordPromptLabel))
    expect(html).not.toContain(dashboardUser.name)
    expect(html).not.toContain(mainNavAriaLabel)
    expect(html).toMatch(/<input[^>]*type="email"/)
    expect(html).toMatch(/<input[^>]*type="password"/)

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.screen-login\{[^}]*justify-content:center/)
    expect(css).toMatch(/\.screen-login\{[^}]*background:#f8fafc/)
    expect(css).toMatch(/\.login-card\{[^}]*width:440px/)
    expect(css).toMatch(/\.login-card\{[^}]*border-radius:16px/)
    expect(css).toMatch(/\.login-card\{[^}]*box-shadow:08px24px#00000008/)
    expect(css).toMatch(/\.login-card.logo-mark\{[^}]*width:40px/)
    expect(css).toMatch(/\.login-card.logo-mark\{[^}]*height:40px/)
  })

  it('renders the signup screen from mock data without the shared chrome', async () => {
    const html = await $fetch<string>('/signup')

    expect(html).toContain(productName)
    expect(html).toContain(signupTitle)
    expect(html).toContain(signupTagline)
    expect(html).toContain(companyFieldLabel)
    expect(html).toContain(fullNameFieldLabel)
    expect(html).toContain(emailFieldLabel)
    expect(html).toContain(passwordFieldLabel)
    expect(html).toContain(passwordConfirmFieldLabel)
    expect(html).toContain(requiredFieldLabel)
    expect(html).toContain(companyPlaceholder)
    expect(html).toContain(fullNamePlaceholder)
    expect(html).toContain(emailPlaceholder)
    expect(html).toContain(passwordPlaceholder)
    expect(html).toContain(termsConsentLabel)
    expect(html).toContain(signupButtonLabel)
    expect(html).toContain(loginLinkLabel)
    expect(firstAnchorWithHref(html, loginPath)).toBeDefined()
    expect(html).not.toContain(dashboardUser.name)
    expect(html).not.toContain(mainNavAriaLabel)
    expect(html).toMatch(/<input[^>]*type="email"/)
    expect(html).toMatch(/<input[^>]*type="checkbox"/)
    expect((html.match(/<input[^>]*type="password"/g) ?? []).length).toBe(2)

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.screen-signup\{[^}]*justify-content:center/)
    expect(css).toMatch(/\.screen-signup\{[^}]*background:#f8fafc/)
    expect(css).toMatch(/\.registration-card\{[^}]*width:480px/)
    expect(css).toMatch(/\.registration-card\{[^}]*border-radius:16px/)
    expect(css).toMatch(/\.registration-card\{[^}]*box-shadow:012px32px#0f172a06/)
    expect(css).toMatch(/\.registration-card.logo-mark\{[^}]*width:36px/)
    expect(css).toMatch(/\.registration-card.logo-mark\{[^}]*height:36px/)
  })

  it('renders the password-reset screen from mock data without the shared chrome', async () => {
    const html = await $fetch<string>(passwordResetPath)

    expect(html).toContain(productName)
    expect(html).toContain(passwordResetTitle)
    expect(html).toContain(emailFieldLabel)
    expect(html).toContain(emailPlaceholder)
    expect(html).toContain(passwordResetButtonLabel)
    expect(html).toContain(loginScreenLinkLabel)
    expect(firstAnchorWithHref(html, loginPath)).toBeDefined()
    expect(html).not.toContain(dashboardUser.name)
    expect(html).not.toContain(mainNavAriaLabel)
    expect(html).toMatch(/<input[^>]*type="email"/)
    expect(html).not.toMatch(/<input[^>]*type="password"/)

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    // å¥åç»é¢ã¨å®äºç»é¢ã§ã»ã¬ã¯ã¿ãå±æãã¦ãããããã¯ã©ã¹åã®ç´å¾ã { ã¨ã¯éããªã
    expect(css).toMatch(/\.screen-password-reset[,{][^}]*justify-content:center/)
    expect(css).toMatch(/\.screen-password-reset[,{][^}]*background:#f8fafc/)
    expect(css).toMatch(/\.password-reset-card\{[^}]*width:440px/)
    expect(css).toMatch(/\.password-reset-card\{[^}]*border-radius:16px/)
  })

  it('renders the password-reset sent screen from mock data without the shared chrome', async () => {
    const html = await $fetch<string>(passwordResetSentPath)

    expect(html).toContain(productName)
    expect(html).toContain(passwordResetSentTitle)
    expect(html).toContain(loginScreenLinkLabel)
    expect(firstAnchorWithHref(html, loginPath)).toBeDefined()
    expect(html).not.toContain(dashboardUser.name)
    expect(html).not.toContain(mainNavAriaLabel)
    expect(html).not.toMatch(/<input[^>]*type="email"/)

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.screen-password-reset-sent\{[^}]*justify-content:center/)
    expect(css).toMatch(/\.screen-password-reset-sent\{[^}]*background:#f8fafc/)
  })

  it('renders public auth screens on the server because localStorage is client-only', async () => {
    expect(isAuthenticated(undefined)).toBe(false)
    expect(isAuthenticated(authStorageValue)).toBe(true)

    const dashboardHtml = await $fetch<string>('/')
    const signupHtml = await $fetch<string>('/signup')
    const resetHtml = await $fetch<string>(passwordResetPath)
    const sentHtml = await $fetch<string>(passwordResetSentPath)
    const settingsHtml = await $fetch<string>(settingsPath)

    expect(dashboardHtml).toContain(totalVideosStatLabel)
    expect(dashboardHtml).toContain(dashboardUser.name)
    expect(signupHtml).toContain(signupTitle)
    expect(signupHtml).toContain(companyFieldLabel)
    expect(resetHtml).toContain(passwordResetButtonLabel)
    expect(sentHtml).toContain(passwordResetSentTitle)
    expect(settingsHtml).toContain(accountSectionTitle)
    expect(settingsHtml).toContain(deleteAccountButtonLabel)
  })

  it('renders the dashboard chrome, stats, and recent uploads from mock data', async () => {
    const html = await fetchPage('/')

    expect(html).toContain(productName)
    expect(html).not.toContain('VideoHub')
    expect(html).toContain(dashboardTitle)
    expect(html).toContain(dashboardNavLabel['video-list'])
    expect(html).toContain(dashboardNavLabel.upload)
    expect(html).toContain(dashboardNavLabel.settings)
    expect(html).toContain(dashboardUser.name)
    expect(html).toContain(dashboardUser.role)
    expect(html).toContain(uploadButtonLabel)
    expect(html).toContain(logoutButtonLabel)

    const headerActions = headerActionsHtml(html)
    expect(headerActions.indexOf(uploadButtonLabel)).toBeGreaterThanOrEqual(0)
    expect(headerActions.indexOf(logoutButtonLabel)).toBeGreaterThan(
      headerActions.indexOf(uploadButtonLabel),
    )
    expect(html).toContain(totalVideosStatLabel)
    expect(html).toContain(videoStatusLabel.published)
    expect(html).toContain(videoStatusLabel.unpublished)
    expect(html).toContain(totalPlayCountStatLabel)
    expect(html).not.toContain('公開済')
    expect(html).not.toContain('処理中')
    expect(html).not.toContain('下書き')
    expect(html).not.toContain('ストレージ')
    expect(html).not.toContain('12.4 GB')
    expect(html).not.toContain('128')
    expect(statValues(html)).toEqual([
      String(videoListItems.length),
      String(videoListItems.filter(video => video.status === 'published').length),
      String(videoListItems.filter(video => video.status === 'unpublished').length),
      '0',
    ])
    expect(statCardByLabel(html, totalVideosStatLabel)).toMatch(/href="\/videos"/)
    expect(statCardByLabel(html, videoStatusLabel.published)).toMatch(
      /href="\/videos\?status=published"/,
    )
    expect(statCardByLabel(html, videoStatusLabel.unpublished)).toMatch(
      /href="\/videos\?status=unpublished"/,
    )
    expect(statCardByLabel(html, totalPlayCountStatLabel)).toMatch(/^<article\b/)
    expect(statCardByLabel(html, totalPlayCountStatLabel)).not.toMatch(/href=/)
    expect(html).toContain(recentSectionTitle)
    expect(html).toContain(viewAllLabel)
    for (const upload of recentUploads) {
      expect(html).toContain(upload.title)
      expect(html).toContain(upload.duration)
      expect(html).toContain(upload.size)
    }
    expect(html).not.toContain('Nuxt セットアップ完了')

    const dashboardNav = firstAnchorWithHref(html, '/')
    const videosNav = firstAnchorWithHref(html, '/videos')
    expect(dashboardNav).toContain('nav-item-active')
    expect(dashboardNav).toContain('aria-current="page"')
    expect(videosNav).not.toContain('nav-item-active')

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.header\{[^}]*padding:20px32px/)
    expect(css).toMatch(/\.header\{[^}]*height:77px/)
    expect(css).toMatch(/\.header-actions\{[^}]*gap:16px/)
    // Figma ã®ã¢ããã­ã¼ããã¿ã³ã¯ 168Ã37ãCJK ã§ã¯ã¿åºããªãåå®¹å¹ã«ãã
    expect(css).toMatch(/\.header-upload\{[^}]*min-width:168px/)
    expect(css).toMatch(/\.header-upload\{[^}]*height:37px/)
    expect(css).toMatch(/\.header-upload\{[^}]*white-space:nowrap/)
    expect(css).toMatch(/\.stats-row\{[^}]*gap:20px/)
    expect(css).toMatch(/\.stat-card\{[^}]*height:107px/)
    expect(css).toMatch(/\.stat-card\{[^}]*padding:24px/)
    expect(css).toMatch(/\.stat-card\{[^}]*gap:16px/)
    expect(css).toMatch(/\.stat-card\{[^}]*text-decoration:none/)
    expect(css).toMatch(/\.stat-card\{[^}]*color:inherit/)
    expect(css).toMatch(/\.icon-container\{[^}]*width:48px/)
    expect(css).toMatch(/\.icon-container\{[^}]*height:48px/)
  })

  it('links the sidebar user avatar to settings and pins the sidebar to the viewport', async () => {
    const html = await fetchPage('/')
    const avatarLink = enclosingAnchorOpeningTag(html, 'avatar')

    expect(html).toContain(dashboardUser.avatarSrc)
    expect(avatarLink).toBeDefined()
    expect(avatarLink).toContain(`href="${settingsPath}"`)

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    // Keep the footer at the viewport bottom even when the screen min-height is 1024px
    expect(css).toMatch(/\.sidebar\{[^}]*position:sticky/)
    expect(css).toMatch(/\.sidebar\{[^}]*top:0/)
    expect(css).toMatch(/\.sidebar\{[^}]*height:100vh/)
  })

  it('links each recent dashboard upload to its video detail page', async () => {
    const html = await fetchPage('/')

    for (const upload of recentUploads) {
      // è©³ç´°ç»é¢ã¯ videoListItems ã® id ã§å¼ããåãåç»ãªã id ãæãã
      expect(videoListItems.some(video => video.id === upload.id)).toBe(true)

      const href = `${videoListPath}/${upload.id}`
      const openingTag = firstAnchorWithHref(html, href)
      expect(openingTag).toBeDefined()
      expect(html).toMatch(
        new RegExp(
          `${escapeRegExp(openingTag!)}[\\s\\S]*?${escapeRegExp(upload.title)}`,
        ),
      )
    }

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.video-row\{[^}]*text-decoration:none/)
    expect(css).toMatch(/\.video-row\{[^}]*color:inherit/)
  })

  it('renders the video list from mock data with video-list nav active', async () => {
    const html = await fetchPage('/videos')

    expect(html).toContain(videoListTitle)
    expect(html).toContain(dashboardUser.name)
    expect(html).toContain(dashboardUser.role)
    expect(html).toContain(uploadButtonLabel)
    expect(html).toContain(logoutButtonLabel)

    const headerActions = headerActionsHtml(html)
    expect(headerActions.indexOf(uploadButtonLabel)).toBeGreaterThanOrEqual(0)
    expect(headerActions.indexOf(logoutButtonLabel)).toBeGreaterThan(
      headerActions.indexOf(uploadButtonLabel),
    )
    expect(html).toContain(searchPlaceholder)
    expect(html).toContain(sortButtonLabel)

    for (const option of statusFilterOptions) {
      expect(html).toContain(option.label)
    }

    expect(statusFilterOptions.map(option => option.value)).toEqual([
      'all',
      'published',
      'unpublished',
    ])
    expect(html).not.toContain('下書き')

    const listCss = (await stylesheetText(html)).replace(/\s+/g, '')
    // åºå®å¹ã ã¨ããã¹ã¦ã®ã¹ãã¼ã¿ã¹ããã¢ããã­ã¼ãæ¥æãã2è¡ã»è¦åãã«ãªã
    expect(listCss).toMatch(/\.status-filter\{[^}]*white-space:nowrap/)
    expect(listCss).toMatch(/\.status-filter\{[^}]*width:auto/)
    expect(listCss).toMatch(/\.filter-select\{[^}]*white-space:nowrap/)
    expect(listCss).toMatch(/\.filter-select\{[^}]*width:auto/)
    expect(listCss).toMatch(/\.sort-button\{[^}]*white-space:nowrap/)
    expect(listCss).toMatch(/\.sort-button\{[^}]*width:auto/)
    expect(listCss).toMatch(/\.sort-button-label\{[^}]*white-space:nowrap/)
    expect(listCss).not.toMatch(/\.sort-button-label\{[^}]*width:106px/)

    for (const column of videoTableColumns) {
      expect(html).toContain(column.label)
    }

    for (const video of videoListItems) {
      expect(html).toContain(video.title)
      expect(html).toContain(video.duration)
      expect(html).toContain(video.size)
      expect(html).toContain(video.uploadedAt)
      expect(html).toContain(videoStatusLabel[video.status])
      expect(html).toContain(`badge-${video.status}`)
      expect(html).toContain(video.thumbnailSrc)
      expect(html).toContain(video.thumbnailAlt)
      expect(firstAnchorWithHref(html, `/videos/${video.id}`)).toBeDefined()
    }

    const dashboardNav = firstAnchorWithHref(html, '/')
    const videosNav = firstAnchorWithHref(html, '/videos')
    expect(videosNav).toContain('nav-item-active')
    expect(videosNav).toContain('aria-current="page"')
    expect(dashboardNav).not.toContain('nav-item-active')
  })

  it('filters the video list by status query from dashboard stat cards', async () => {
    const publishedHtml = await fetchPage('/videos?status=published')
    const unpublishedHtml = await fetchPage('/videos?status=unpublished')
    const publishedVideos = videoListItems.filter(video => video.status === 'published')
    const unpublishedVideos = videoListItems.filter(video => video.status === 'unpublished')

    expect(selectedOptionValue(publishedHtml)).toBe('published')
    expect(selectedOptionValue(unpublishedHtml)).toBe('unpublished')

    for (const video of publishedVideos) {
      expect(publishedHtml).toContain(video.title)
      expect(unpublishedHtml).not.toContain(video.title)
    }

    for (const video of unpublishedVideos) {
      expect(unpublishedHtml).toContain(video.title)
      expect(publishedHtml).not.toContain(video.title)
    }
  })

  it('renders the video detail from list mock data with video-list nav active', async () => {
    const video = videoListItems[0]
    const html = await fetchPage(`/videos/${video.id}`)

    expect(html).toContain(videoDetailTitle)
    expect(html).toContain(cancelButtonLabel)
    expect(html).toContain(saveButtonLabel)
    expect(html).toContain(titleFieldLabel)
    expect(html).toContain(descriptionFieldLabel)
    expect(html).toContain(visibilitySectionTitle)
    expect(html).toContain(publishToggleLabel)
    expect(html).toContain(streamUrlSectionTitle)
    expect(html).toContain(copyButtonLabel)
    expect(copySuccessLabel).toBe('コピーしました')
    expect(html).toContain(metadataSectionTitle)

    for (const label of metadataRowLabels) {
      expect(html).toContain(label)
    }

    expect(html).toContain(video.title)
    expect(html).toMatch(
      new RegExp(`<textarea[^>]*>\\s*${escapeRegExp(video.description)}\\s*</textarea>`),
    )
    expect(html).toMatch(
      new RegExp(
        `<span[^>]*class="m3u8-url"[^>]*>\\s*${escapeRegExp(video.streamUrl)}\\s*</span>\\s*<button[^>]*class="copy-btn"[^>]*aria-live="polite"`,
      ),
    )
    expect(html).toContain(video.duration)
    expect(html).toContain(video.size)
    expect(html).toContain(video.uploadedAt)
    expect(html).toContain(videoStatusLabel[video.status])
    expect(html).toContain(`badge-${video.status}`)
    expect(html).toContain(video.thumbnailSrc)
    expect(html).toContain(dashboardUser.name)
    expect(html).toContain(dashboardUser.role)

    const otherVideo = videoListItems[1]
    const otherHtml = await fetchPage(`/videos/${otherVideo.id}`)
    expect(otherHtml).toMatch(
      new RegExp(`<textarea[^>]*>\\s*${escapeRegExp(otherVideo.description)}\\s*</textarea>`),
    )
    expect(otherHtml).toContain(otherVideo.streamUrl)
    expect(otherHtml).not.toContain(video.description)
    expect(otherHtml).not.toContain(video.streamUrl)

    const dashboardNav = firstAnchorWithHref(html, '/')
    const videosNav = firstAnchorWithHref(html, '/videos')
    expect(videosNav).toContain('nav-item-active')
    expect(videosNav).toContain('aria-current="page"')
    expect(dashboardNav).not.toContain('nav-item-active')

    expect(html).toMatch(
      new RegExp(`<a[^>]*href="/videos"[^>]*>[\\s\\S]*?${cancelButtonLabel}`),
    )
    expect(html).toContain('video-player-container')
    expect(html).toMatch(/<video\b/)
    expect(
      html.includes(videoPlaybackSrc) || html.includes(encodeURI(videoPlaybackSrc)),
    ).toBe(true)

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.video-player-container\{[^}]*width:50%/)
    expect(css).toMatch(/\.video-player-container\{[^}]*aspect-ratio:16\/9/)
    expect(css).toMatch(/\.video-player-container\{[^}]*align-self:center/)
    // 1440px åºå®ã¨ overflow ã§å³ãã¤ã³ãã¯ãªãããããªããã¨
    expect(css).toMatch(/\.screen-video-detail\{[^}]*min-width:0/)
    expect(css).toMatch(/\.screen-video-detail\.page-body\{[^}]*min-width:0/)
    expect(css).toMatch(/\.screen-video-detail\.main-content\{[^}]*overflow-x:visible/)
    expect(css).toMatch(/\.right-pane\{[^}]*min-width:380px/)
    // åºå®å¹ã ã¨ãã­ã£ã³ã»ã«ããå¤æ´ãä¿å­ããåé¤ãã2è¡ã»è¦åãã«ãªã
    expect(css).toMatch(/\.header-cancel,.header-delete,.header-save\{[^}]*width:auto/)
    expect(css).toMatch(/\.header-cancel,.header-delete,.header-save\{[^}]*white-space:nowrap/)
    expect(css).toMatch(/\.copy-btn\{[^}]*width:auto/)
    expect(css).toMatch(/\.copy-btn\{[^}]*white-space:nowrap/)
  })

  it('keeps a single vertical scrollbar on the video detail screen', async () => {
    const video = videoListItems[0]
    const html = await fetchPage(`/videos/${video.id}`)
    const css = (await stylesheetText(html)).replace(/\s+/g, '')

    expect(css).toMatch(/\.screen-video-detail\{[^}]*min-height:0/)
    expect(css).toMatch(/\.screen-video-detail\{[^}]*overflow:hidden/)
    expect(css).toMatch(/\.screen-video-detail\.main-content\{[^}]*min-height:0/)
    expect(css).toMatch(/\.screen-video-detail\.main-content\{[^}]*overflow-y:auto/)
  })

  it('hides video delete controls for free members', async () => {
    const video = videoListItems[0]
    const html = await fetchPage(`/videos/${video.id}`)

    expect(isPaidMembership(undefined)).toBe(false)
    expect(elementOpeningTag(html, 'header-delete')).toBeUndefined()
    expect(html).not.toContain(deleteConfirmMessage)
    expect(html).not.toContain(deleteConfirmTitle)
  })

  it('renders the video detail publish toggle from mock data', async () => {
    const publishedVideo = videoListItems[0]
    const unpublishedVideo = videoListItems.find(video => video.status === 'unpublished')
    expect(publishedVideo.status).toBe('published')
    expect(unpublishedVideo).toBeDefined()

    const html = await fetchPage(`/videos/${publishedVideo.id}`)
    const unpublishedHtml = await fetchPage(`/videos/${unpublishedVideo!.id}`)

    const publishedSwitch = switchButtonOpeningTag(html)
    expect(publishedSwitch).toBeDefined()
    expect(publishedSwitch).toContain('role="switch"')
    expect(publishedSwitch).toContain('aria-checked="true"')
    expect(publishedSwitch).toContain(`aria-label="${publishToggleLabel}"`)

    const unpublishedSwitch = switchButtonOpeningTag(unpublishedHtml)
    expect(unpublishedSwitch).toBeDefined()
    expect(unpublishedSwitch).toContain('role="switch"')
    expect(unpublishedSwitch).toContain('aria-checked="false"')
    expect(unpublishedHtml).toContain(`badge-${unpublishedVideo!.status}`)
    expect(unpublishedHtml).toContain(videoStatusLabel[unpublishedVideo!.status])

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.delete-dialog-overlay\{[^}]*position:fixed/)
    expect(css).toMatch(/\.delete-dialog-overlay\[hidden\]\{[^}]*display:none/)
    expect(css).toMatch(/\.header-cancel,.header-delete,.header-save\{[^}]*white-space:nowrap/)
    expect(css).toMatch(/\.header-delete\{[^}]*cursor:pointer/)
    expect(css).toMatch(/\.toggle-switch\{[^}]*cursor:pointer/)
  })

  it('renders thumbnail and subtitle settings from the video record without placeholder tracks', async () => {
    const video = videoListItems[0]
    const html = await fetchPage(`/videos/${video.id}`)
    const otherVideo = videoListItems[1]
    const otherHtml = await fetchPage(`/videos/${otherVideo.id}`)

    expect(html).toContain(thumbnailSectionTitle)
    expect(html).toContain(thumbnailUploadLabel)
    expect(html).toContain(thumbnailResetLabel)
    expect(html).toContain(thumbnailHint)
    expect(html).toContain(thumbnailFileAccept)
    expect(html).toContain(subtitleSectionTitle)
    expect(html).toContain(subtitleUploadLabel)
    expect(html).toContain(subtitleEmptyMessage)
    expect(html).toContain(subtitleHint)
    expect(html).toContain(subtitleFileAccept)

    const titleFieldIndex = html.indexOf('class="field-title"')
    const descriptionFieldIndex = html.indexOf('class="field-description"')
    const thumbnailSettingsIndex = html.indexOf(thumbnailSectionTitle)
    const subtitleSettingsIndex = html.indexOf(subtitleSectionTitle)
    expect(titleFieldIndex).toBeGreaterThan(-1)
    expect(descriptionFieldIndex).toBeGreaterThan(titleFieldIndex)
    expect(thumbnailSettingsIndex).toBeGreaterThan(descriptionFieldIndex)
    expect(subtitleSettingsIndex).toBeGreaterThan(thumbnailSettingsIndex)

    const preview = elementOpeningTag(html, 'thumbnail-preview')
    expect(preview).toBeDefined()
    expect(preview).toContain(`src="${video.thumbnailSrc}"`)
    expect(preview).toContain(`alt="${video.thumbnailAlt}"`)

    const videoTag = html.match(/<video\b[^>]*>/)?.[0]
    expect(videoTag).toBeDefined()
    expect(videoTag).toContain(`poster="${video.thumbnailSrc}"`)
    expect(html).not.toMatch(/<track\b/)

    const resetButton = elementOpeningTag(html, 'thumbnail-reset')
    expect(resetButton).toBeDefined()
    expect(resetButton).toMatch(/\bdisabled\b/)

    expect(otherHtml).toContain(otherVideo.thumbnailSrc)
    expect(otherHtml).toContain(otherVideo.thumbnailAlt)
    expect(otherHtml).not.toContain(video.thumbnailSrc)

    expect(subtitleLanguageOptions.map(option => option.value)).toEqual(['ja', 'en'])
    expect(
      videoListItems.every(item => !('subtitles' in item) && !('subtitleTracks' in item)),
    ).toBe(true)

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.media-settings-row\{[^}]*flex-direction:row/)
    expect(css).toMatch(/\.thumbnail-preview\{[^}]*aspect-ratio:16\/9/)
    expect(css).toMatch(/\.file-input-hidden\{[^}]*position:absolute/)
  })

  it('renders the upload screen from mock data with upload nav active', async () => {
    const html = await fetchPage('/upload')

    expect(html).toContain(uploadButtonLabel)
    expect(html).toContain(dashboardUser.name)
    expect(html).toContain(dashboardUser.role)
    expect(html).toContain(dropZoneTitle)
    expect(html).toContain(dropZoneSubtitle)
    expect(html).toContain(selectFileButtonLabel)
    expect(html).toContain(conversionPipelineTitle)
    expect(html).toContain(conversionProgressLabel)
    expect(html).toContain(`${conversionProgressPercent}%`)
    expect(html).toContain(conversionPipelineNote)
    expect(html).toContain(uploadingFile.filename)
    expect(html).toContain(uploadingFile.metadata)
    expect(html).toContain(freeUploadLimitNote)
    expect(html).not.toContain(paidUploadMultipleNote)
    expect(html).toContain(videoFileAccept)

    const first = new File(['a'], 'first.mp4', { type: 'video/mp4' })
    const second = new File(['b'], 'second.mp4', { type: 'video/mp4' })
    const textFile = new File(['c'], 'notes.txt', { type: 'text/plain' })
    expect(limitSelectedFiles([first, second], false)).toEqual([first])
    expect(limitSelectedFiles([first, second], true)).toEqual([first, second])
    expect(limitSelectedFiles([textFile, first], false)).toEqual([first])
    expect(freeUploadLimit).toBe(1)
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(2048)).toBe('2.0 KB')

    const fileInput = html.match(/<input\b[^>]*type="file"[^>]*>/)?.[0]
    expect(fileInput).toBeDefined()
    expect(fileInput).not.toMatch(/\bmultiple\b/)

    for (const step of conversionSteps) {
      expect(html).toContain(conversionStepLabel[step.id])
    }

    const dashboardNav = firstAnchorWithHref(html, '/')
    const videosNav = firstAnchorWithHref(html, '/videos')
    const uploadNav = firstAnchorWithHref(html, '/upload')
    expect(uploadNav).toContain('nav-item-active')
    expect(uploadNav).toContain('aria-current="page"')
    expect(dashboardNav).not.toContain('nav-item-active')
    expect(videosNav).not.toContain('nav-item-active')

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.drop-zone\{[^}]*border:2pxdashed#2563eb/)
    expect(css).toMatch(/\.select-file-btn\{[^}]*white-space:nowrap/)
    expect(css).toMatch(/\.select-file-btn\{[^}]*width:auto/)
  })

  it('renders the settings screen from mock account data with settings nav active', async () => {
    const html = await fetchPage(settingsPath)
    const accountInfo = accountInfoHtml(html)
    const membershipStatus = membershipStatusHtml(html)
    const maskedEmail = maskEmail(registeredAccount.email)

    expect(maskEmail('hana@example.com')).toBe('h***@example.com')
    expect(maskEmail('a@x.com')).toBe('a*@x.com')
    expect(maskedEmail).toBe('t**********@example.com')

    expect(html).toContain(settingsTitle)
    expect(html).toContain(accountSectionTitle)
    expect(html).toContain(companyFieldLabel)
    expect(html).toContain(fullNameFieldLabel)
    expect(html).toContain(emailFieldLabel)
    expect(html).not.toContain(passwordFieldLabel)
    expect(html).not.toContain(passwordConfirmFieldLabel)
    expect(html).not.toMatch(/<input[^>]*type="password"/)

    expect(accountInfo).toContain(registeredAccount.companyName)
    expect(accountInfo).toContain(registeredAccount.fullName)
    expect(accountInfo).toContain(maskedEmail)
    expect(accountInfo).not.toContain(registeredAccount.email)

    expect(isPaidMembership(undefined)).toBe(false)
    expect(isPaidMembership(paidMembershipValue)).toBe(true)
    expect(html).toContain(membershipSectionTitle)
    expect(membershipStatus).toContain(freeMemberLabel)
    expect(membershipStatus).not.toContain(paidMemberLabel)
    expect(html).toContain(paymentSectionTitle)
    expect(html).toContain(paymentSectionDescription)
    expect(html).toContain(cardNumberFieldLabel)
    expect(html).toContain(cardExpiryFieldLabel)
    expect(html).toContain(cardCvcFieldLabel)
    expect(html).toContain(cardHolderFieldLabel)
    expect(html).toContain(payButtonLabel)
    expect(html).toContain(cardNumberPlaceholder)
    expect(html).not.toContain('4242')

    const paymentOverlay = elementOpeningTag(html, 'payment-complete-overlay')
    expect(paymentOverlay).toBeDefined()
    expect(paymentOverlay).toMatch(/\bhidden\b/)
    expect(html).toContain(paymentCompleteTitle)
    expect(html).toContain(paymentCompleteConfirmLabel)

    expect(html).toContain(deleteAccountButtonLabel)
    expect(html).toContain(dashboardUser.name)
    expect(html).toContain(dashboardUser.role)

    const headerActions = headerActionsHtml(html)
    expect(headerActions).toContain(deleteAccountButtonLabel)
    expect(headerActions).toMatch(
      new RegExp(`<button[^>]*>[\\s\\S]*?${escapeRegExp(deleteAccountButtonLabel)}`),
    )

    const dashboardNav = firstAnchorWithHref(html, '/')
    const videosNav = firstAnchorWithHref(html, '/videos')
    const settingsNav = firstAnchorWithHref(html, settingsPath)
    expect(settingsNav).toContain('nav-item-active')
    expect(settingsNav).toContain('aria-current="page"')
    expect(dashboardNav).not.toContain('nav-item-active')
    expect(videosNav).not.toContain('nav-item-active')

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    // ã¢ã«ã¦ã³ãã»ä¼å¡ã»æ¯æãã«ã¼ãã§ã»ã¬ã¯ã¿ãå±æãã¦ãããããã¯ã©ã¹åã®ç´å¾ã { ã¨ã¯éããªã
    expect(css).toMatch(/\.account-info[,{][^}]*background:#fff/)
    expect(css).toMatch(/\.account-info[,{][^}]*border-radius:12px/)
    expect(css).toMatch(/\.membership-status[,{][^}]*background:#fff/)
    expect(css).toMatch(/\.badge-free\{[^}]*background:#f1f5f9/)
    expect(css).toMatch(/\.badge-paid\{[^}]*background:#ecfdf5/)
    expect(css).toMatch(/\.payment-form[,{][^}]*background:#fff/)
    expect(css).toMatch(/\.header-delete\{[^}]*cursor:pointer/)
  })

  it('excludes deleted video ids from visible lists', () => {
    const video = videoListItems[0]
    expect(parseDeletedVideoIds(undefined)).toEqual([])
    expect(parseDeletedVideoIds(video.id)).toEqual([video.id])
    expect(excludeDeletedVideos(videoListItems, [video.id]).some(item => item.id === video.id))
      .toBe(false)
  })

  it('renders the settings delete confirmation dialog from mock data', async () => {
    const html = await fetchPage(settingsPath)

    expect(html).toMatch(/role="dialog"/)
    expect(html).toContain(deleteAccountConfirmTitle)
    expect(html).toContain(deleteAccountConfirmMessage)
    expect(html).toContain(deleteAccountConfirmOkLabel)
    expect(html).toContain(deleteAccountConfirmCancelLabel)

    const overlayTag = elementOpeningTag(html, 'delete-dialog-overlay')
    expect(overlayTag).toBeDefined()
    expect(overlayTag).toMatch(/\bhidden\b/)

    const dialog = dialogHtml(html)
    expect(dialog).toContain(deleteAccountConfirmTitle)
    expect(dialog).toContain(deleteAccountConfirmMessage)
    expect(dialog).toContain(deleteAccountConfirmOkLabel)
    expect(dialog).toContain(deleteAccountConfirmCancelLabel)
    expect(dialog).toMatch(
      new RegExp(`<button[^>]*>[\\s\\S]*?${escapeRegExp(deleteAccountConfirmCancelLabel)}`),
    )
    expect(dialog).toMatch(
      new RegExp(`<button[^>]*>[\\s\\S]*?${escapeRegExp(deleteAccountConfirmOkLabel)}`),
    )

    const css = (await stylesheetText(html)).replace(/\s+/g, '')
    expect(css).toMatch(/\.delete-dialog-overlay\{[^}]*position:fixed/)
    expect(css).toMatch(/\.delete-dialog-overlay\[hidden\]\{[^}]*display:none/)
  })
})
