import type { VideoStatus } from './dashboard'
import { videoStatusLabel } from './dashboard'

export type VideoListStatusFilter = 'all' | VideoStatus

export interface VideoListItem {
  id: string
  title: string
  duration: string
  size: string
  uploadedAt: string
  status: VideoStatus
  thumbnailSrc: string
  thumbnailAlt: string
}

export const videoListTitle = '動画一覧'
export const searchPlaceholder = '動画を検索'
export const sortButtonLabel = 'アップロード日時'

export const statusFilterOptions: readonly {
  value: VideoListStatusFilter
  label: string
}[] = [
  { value: 'all', label: 'すべてのステータス' },
  { value: 'published', label: videoStatusLabel.published },
  { value: 'processing', label: videoStatusLabel.processing },
  { value: 'draft', label: videoStatusLabel.draft },
]

export const videoTableColumns: readonly { id: string, label: string }[] = [
  { id: 'thumbnail', label: 'サムネイル' },
  { id: 'title', label: 'タイトル' },
  { id: 'duration', label: '再生時間' },
  { id: 'size', label: 'ファイルサイズ' },
  { id: 'status', label: 'ステータス' },
  { id: 'uploadedAt', label: 'アップロード日時' },
]

/**
 * UIモック。API未接続のため、画面表示専用の固定データ。
 * 再生時間・サイズ・日時は Figma の動画一覧行、タイトルは既存の最近のアップロード
 * および Figma サムネイル説明（CSS にタイトル文字列がない行）から取る。
 */
export const videoListItems: readonly VideoListItem[] = [
  {
    id: 'video-product-ui',
    title: '製品UIデモ：ダッシュボード操作説明',
    duration: '02:45',
    size: '48.2 MB',
    uploadedAt: '2026/03/10 14:22',
    status: 'published',
    thumbnailSrc: '/images/thumb-product-intro.png',
    thumbnailAlt: '製品UIデモ動画のサムネイル',
  },
  {
    id: 'video-training',
    title: '社内研修：アーキテクチャ解説セッション',
    duration: '15:20',
    size: '284.1 MB',
    uploadedAt: '2026/03/10 13:05',
    status: 'processing',
    thumbnailSrc: '/images/thumb-training-distribution.png',
    thumbnailAlt: '社内研修動画のサムネイル',
  },
  {
    id: 'video-brand-movie',
    title: 'ブランドムービー：夕暮れの山並み',
    duration: '01:00',
    size: '120.5 MB',
    uploadedAt: '2026/03/10 10:11',
    status: 'published',
    thumbnailSrc: '/images/thumb-mountain.png',
    thumbnailAlt: 'ブランドムービーのサムネイル',
  },
  {
    id: 'video-interview',
    title: 'オンライン面談：インタビュー録画',
    duration: '08:12',
    size: '192.4 MB',
    uploadedAt: '2026/03/09 17:45',
    status: 'draft',
    thumbnailSrc: '/images/thumb-interview.png',
    thumbnailAlt: 'オンライン面談動画のサムネイル',
  },
  {
    id: 'video-coding-session',
    title: '技術解説：ライブコーディングセッション',
    duration: '03:30',
    size: '75.8 MB',
    uploadedAt: '2026/03/09 09:30',
    status: 'published',
    thumbnailSrc: '/images/thumb-coding-session.png',
    thumbnailAlt: 'ライブコーディング動画のサムネイル',
  },
  {
    id: 'video-introduction-procedures',
    title: '導入手順：チュートリアル',
    duration: '12:15',
    size: '210.3 MB',
    uploadedAt: '2026/03/08 15:40',
    status: 'published',
    thumbnailSrc: '/images/thumb-introduction-procedures.png',
    thumbnailAlt: '導入手順チュートリアル動画のサムネイル',
  },
]
