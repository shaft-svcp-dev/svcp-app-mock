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
  icon: NavIconName
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
  { id: 'dashboard', icon: 'layout-dashboard' },
  { id: 'video-list', icon: 'video' },
  { id: 'upload', icon: 'cloud-upload' },
  { id: 'settings', icon: 'sliders-horizontal' },
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
