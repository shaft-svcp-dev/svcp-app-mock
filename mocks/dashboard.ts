export type NavIconName =
  | 'layout-dashboard'
  | 'video'
  | 'cloud-upload'
  | 'sliders-horizontal'

export type StatIconName = 'file-video' | 'badge-check' | 'loader' | 'chart-line'

export type StatTone = 'blue' | 'green' | 'amber'

export type VideoStatus = 'published' | 'unpublished'

export interface DashboardNavItem {
  id: string
  label: string
  icon: NavIconName
  to: string
}

export interface DashboardUser {
  name: string
  role: string
  avatarSrc: string
  avatarAlt: string
}

export interface DashboardStat {
  id: string
  label: string
  value: string
  icon: StatIconName
  tone: StatTone
  // 指定時は動画一覧へ遷移する。遷移しないカードは省略する
  to?: string
}

export interface RecentUpload {
  id: string
  title: string
  duration: string
  size: string
  uploadedAt: string
  status: VideoStatus
  thumbnailSrc: string
  thumbnailAlt: string
}

export const productName = 'SVCP'
export const dashboardTitle = 'ダッシュボード'
export const videoListPath = '/videos'
export const videoListStatusQueryParam = 'status'
export const uploadButtonLabel = '動画をアップロード'
export const logoutButtonLabel = 'ログアウト'
export const recentSectionTitle = '最近のアップロード'
export const viewAllLabel = 'すべて見る'
export const totalVideosStatLabel = '総動画数'
export const totalPlayCountStatLabel = '総再生回数'

export const videoStatusLabel: Record<VideoStatus, string> = {
  published: '公開中',
  unpublished: '非公開中',
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

/**
 * UIモック。API未接続のため、画面表示専用の固定データ。
 */
export const dashboardUser: DashboardUser = {
  name: '田中 太郎',
  role: 'プロダクトマネージャー',
  avatarSrc: '/images/avatar-tanaka-taro.png',
  avatarAlt: '田中 太郎のプロフィール画像',
}

export const dashboardNavItems: readonly DashboardNavItem[] = [
  { id: 'dashboard', label: 'ダッシュボード', icon: 'layout-dashboard', to: '/' },
  { id: 'video-list', label: '動画一覧', icon: 'video', to: videoListPath },
  { id: 'upload', label: 'アップロード', icon: 'cloud-upload', to: '/upload' },
  { id: 'settings', label: '設定', icon: 'sliders-horizontal', to: '/settings' },
]

/**
 * 詳細画面は videoListItems の id で引くため、同じ動画を指す id は一覧側に合わせる。
 */
export const recentUploads: readonly RecentUpload[] = [
  {
    id: 'video-product-ui',
    title: '製品UIデモ：ダッシュボード操作説明',
    duration: '再生時間 12:48',
    size: 'ファイルサイズ 245.8MB',
    uploadedAt: '2日前',
    status: 'published',
    thumbnailSrc: '/images/thumb-product-ui.png',
    thumbnailAlt: '製品UIデモ動画のサムネイル',
  },
  {
    id: 'video-training',
    title: '社内研修：アーキテクチャ解説セッション',
    duration: '再生時間 18:05',
    size: 'ファイルサイズ 312.4MB',
    uploadedAt: '5日前',
    status: 'unpublished',
    thumbnailSrc: '/images/thumb-training.png',
    thumbnailAlt: '社内研修動画のサムネイル',
  },
  {
    id: 'video-brand-movie',
    title: 'ブランドムービー：夕暮れの山並み',
    duration: '再生時間 03:27',
    size: 'ファイルサイズ 1.02GB',
    uploadedAt: '1週間前',
    status: 'published',
    thumbnailSrc: '/images/thumb-mountain.png',
    thumbnailAlt: 'ブランドムービーのサムネイル',
  },
]
