import type { DashboardStat, VideoStatus } from '~/mocks/dashboard'
// e2e が constants を直接 import するため、Nuxt の ~/ alias は使わない
import { videoListPath, videoListStatusQueryParam } from '../routes'

/**
 * 画面名・ボタン・セクション見出しなど、表示用の文言。
 * レコード値は mocks/ に置く。
 */
export const productName = 'SVCP'
export const dashboardTitle = 'ダッシュボード'
export const uploadButtonLabel = '動画をアップロード'
export const logoutButtonLabel = 'ログアウト'
export const recentSectionTitle = '最近のアップロード'
export const viewAllLabel = 'すべて見る'
export const totalVideosStatLabel = '総動画数'
export const totalPlayCountStatLabel = '総再生回数'
export const mainNavAriaLabel = 'メインナビゲーション'

export const videoStatusLabel: Record<VideoStatus, string> = {
  published: '公開中',
  unpublished: '非公開中',
}

export const dashboardNavLabel: Record<string, string> = {
  dashboard: dashboardTitle,
  'video-list': '動画一覧',
  upload: 'アップロード',
  settings: '設定',
}

export function buildDashboardStats(
  videos: readonly { status: VideoStatus }[],
): DashboardStat[] {
  const publishedCount = videos.filter(video => video.status === 'published').length
  const unpublishedCount = videos.filter(video => video.status === 'unpublished').length

  return [
    {
      id: 'total-videos',
      label: totalVideosStatLabel,
      value: String(videos.length),
      icon: 'file-video',
      tone: 'blue',
      to: videoListPath,
    },
    {
      id: 'published',
      label: videoStatusLabel.published,
      value: String(publishedCount),
      icon: 'badge-check',
      tone: 'green',
      to: `${videoListPath}?${videoListStatusQueryParam}=published`,
    },
    {
      id: 'unpublished',
      label: videoStatusLabel.unpublished,
      value: String(unpublishedCount),
      icon: 'loader',
      tone: 'amber',
      to: `${videoListPath}?${videoListStatusQueryParam}=unpublished`,
    },
    // 総再生回数は一覧の絞り込み条件に対応しないため、to を付けずリンクにしない
    {
      id: 'play-count',
      label: totalPlayCountStatLabel,
      // 動画レコードに再生回数がないため、合計できない
      value: '0',
      icon: 'chart-line',
      tone: 'blue',
    },
  ]
}
