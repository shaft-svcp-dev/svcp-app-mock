import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'
import {
  dashboardUser,
  uploadButtonLabel,
  videoStatusLabel,
} from '../mocks/dashboard'
import {
  searchPlaceholder,
  sortButtonLabel,
  statusFilterOptions,
  videoListItems,
  videoListTitle,
  videoTableColumns,
} from '../mocks/videos'
import {
  cancelButtonLabel,
  copyButtonLabel,
  descriptionFieldLabel,
  metadataSectionTitle,
  metadataRowLabels,
  publishToggleLabel,
  saveButtonLabel,
  streamUrlSectionTitle,
  titleFieldLabel,
  videoDetailTitle,
  videoPlaybackSrc,
  visibilitySectionTitle,
} from '../mocks/video-detail'

function firstAnchorWithHref(html: string, href: string): string | undefined {
  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return html.match(new RegExp(`<a[^>]*href="${escapedHref}"[^>]*>`))?.[0]
}

async function stylesheetText(html: string): Promise<string> {
  const hrefs = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(match => match[1])
  const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(match => match[1])
  const linked = await Promise.all(hrefs.map(href => $fetch<string>(href).catch(() => '')))
  return [...inline, ...linked].join('\n')
}

describe('SVCP mock screens', async () => {
  await setup({
    rootDir: '.',
  })

  it('renders the dashboard chrome, stats, and recent uploads from mock data', async () => {
    const html = await $fetch<string>('/')

    expect(html).toContain('SVCP')
    expect(html).not.toContain('VideoHub')
    expect(html).toContain('ダッシュボード')
    expect(html).toContain('動画一覧')
    expect(html).toContain('アップロード')
    expect(html).toContain('設定')
    expect(html).toContain('田中 太郎')
    expect(html).toContain('プロダクトマネージャー')
    expect(html).toContain('動画をアップロード')
    expect(html).toContain('総動画数')
    expect(html).toContain('128')
    expect(html).toContain('公開済')
    expect(html).toContain('42')
    expect(html).toContain('処理中')
    expect(html).toContain('ストレージ')
    expect(html).toContain('12.4 GB')
    expect(html).toContain('最近のアップロード')
    expect(html).toContain('すべて見る')
    expect(html).toContain('製品UIデモ：ダッシュボード操作説明')
    expect(html).toContain('社内研修：アーキテクチャ解説セッション')
    expect(html).toContain('ブランドムービー：夕暮れの山並み')
    expect(html).toContain('再生時間 12:48')
    expect(html).toContain('ファイルサイズ 245.8MB')
    expect(html).not.toContain('Nuxt セットアップ完了')

    const dashboardNav = firstAnchorWithHref(html, '/')
    const videosNav = firstAnchorWithHref(html, '/videos')
    expect(dashboardNav).toContain('nav-item-active')
    expect(dashboardNav).toContain('aria-current="page"')
    expect(videosNav).not.toContain('nav-item-active')
  })

  it('renders the video list from mock data with video-list nav active', async () => {
    const html = await $fetch<string>('/videos')

    expect(html).toContain(videoListTitle)
    expect(html).toContain(dashboardUser.name)
    expect(html).toContain(dashboardUser.role)
    expect(html).toContain(uploadButtonLabel)
    expect(html).toContain(searchPlaceholder)
    expect(html).toContain(sortButtonLabel)

    for (const option of statusFilterOptions) {
      expect(html).toContain(option.label)
    }

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

  it('renders the video detail from list mock data with video-list nav active', async () => {
    const video = videoListItems[0]
    const html = await $fetch<string>(`/videos/${video.id}`)

    expect(html).toContain(videoDetailTitle)
    expect(html).toContain(cancelButtonLabel)
    expect(html).toContain(saveButtonLabel)
    expect(html).toContain(titleFieldLabel)
    expect(html).toContain(descriptionFieldLabel)
    expect(html).toContain(visibilitySectionTitle)
    expect(html).toContain(publishToggleLabel)
    expect(html).toContain(streamUrlSectionTitle)
    expect(html).toContain(copyButtonLabel)
    expect(html).toContain(metadataSectionTitle)

    for (const label of metadataRowLabels) {
      expect(html).toContain(label)
    }

    expect(html).toContain(video.title)
    expect(html).toContain(video.duration)
    expect(html).toContain(video.size)
    expect(html).toContain(video.uploadedAt)
    expect(html).toContain(videoStatusLabel[video.status])
    expect(html).toContain(`badge-${video.status}`)
    expect(html).toContain(video.thumbnailSrc)
    expect(html).toContain(dashboardUser.name)
    expect(html).toContain(dashboardUser.role)

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
    // 1440px 固定と overflow で右ペインがクリップされないこと
    expect(css).toMatch(/\.screen-video-detail\{[^}]*min-width:0/)
    expect(css).toMatch(/\.screen-video-detail\.page-body\{[^}]*min-width:0/)
    expect(css).toMatch(/\.screen-video-detail\.main-content\{[^}]*overflow-x:visible/)
    expect(css).toMatch(/\.right-pane\{[^}]*min-width:380px/)
  })
})
