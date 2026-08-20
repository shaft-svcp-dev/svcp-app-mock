export type NavIconName =
  | 'layout-dashboard'
  | 'video'
  | 'cloud-upload'
  | 'sliders-horizontal'

export type StatIconName = 'file-video' | 'badge-check' | 'loader' | 'chart-line'

export type StatTone = 'blue' | 'green' | 'amber'

export type VideoStatus = 'published' | 'processing' | 'draft'

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
export const uploadButtonLabel = '動画をアップロード'
export const recentSectionTitle = '最近のアップロード'
export const viewAllLabel = 'すべて見る'

export const videoStatusLabel: Record<VideoStatus, string> = {
  published: '公開済',
  processing: '処理中',
  draft: '下書き',
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
  { id: 'video-list', label: '動画一覧', icon: 'video', to: '/videos' },
  { id: 'upload', label: 'アップロード', icon: 'cloud-upload', to: '/upload' },
  { id: 'settings', label: '設定', icon: 'sliders-horizontal', to: '/settings' },
]

export const dashboardStats: readonly DashboardStat[] = [
  { id: 'total-videos', label: '総動画数', value: '128', icon: 'file-video', tone: 'blue' },
  { id: 'published', label: '公開済', value: '42', icon: 'badge-check', tone: 'green' },
  { id: 'processing', label: '処理中', value: '3', icon: 'loader', tone: 'amber' },
  { id: 'storage', label: 'ストレージ', value: '12.4 GB', icon: 'chart-line', tone: 'blue' },
]

export const recentUploads: readonly RecentUpload[] = [
  {
    id: 'upload-product-ui',
    title: '製品UIデモ：ダッシュボード操作説明',
    duration: '再生時間 12:48',
    size: 'ファイルサイズ 245.8MB',
    uploadedAt: '2日前',
    status: 'published',
    thumbnailSrc: '/images/thumb-product-ui.png',
    thumbnailAlt: '製品UIデモ動画のサムネイル',
  },
  {
    id: 'upload-training',
    title: '社内研修：アーキテクチャ解説セッション',
    duration: '再生時間 18:05',
    size: 'ファイルサイズ 312.4MB',
    uploadedAt: '5日前',
    status: 'processing',
    thumbnailSrc: '/images/thumb-training.png',
    thumbnailAlt: '社内研修動画のサムネイル',
  },
  {
    id: 'upload-brand-movie',
    title: 'ブランドムービー：夕暮れの山並み',
    duration: '再生時間 03:27',
    size: 'ファイルサイズ 1.02GB',
    uploadedAt: '1週間前',
    status: 'published',
    thumbnailSrc: '/images/thumb-mountain.png',
    thumbnailAlt: 'ブランドムービーのサムネイル',
  },
]
