import type { VideoStatus } from './dashboard'
import { videoStatusLabel } from './dashboard'

export type VideoListStatusFilter = 'all' | VideoStatus

export interface VideoListItem {
  id: string
  title: string
  description: string
  streamUrl: string
  duration: string
  size: string
  uploadedAt: string
  status: VideoStatus
  thumbnailSrc: string
  thumbnailAlt: string
}

// モック配列は書き換えない。削除済み id は localStorage で画面をまたいで隠す
export const deletedVideoIdsStorageKey = 'svcp-deleted-video-ids'

export function parseDeletedVideoIds(value: string | null | undefined): string[] {
  if (!value) {
    return []
  }

  return value.split(',').map(id => id.trim()).filter(id => id.length > 0)
}

export function excludeDeletedVideos<T extends { id: string }>(
  videos: readonly T[],
  deletedIds: readonly string[],
): T[] {
  const deleted = new Set(deletedIds)
  return videos.filter(video => !deleted.has(video.id))
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
  { value: 'unpublished', label: videoStatusLabel.unpublished },
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
 * 説明とストリームURLは詳細画面で DB 保存フィールドとして扱う。デザインに本文が無いため、
 * 説明は各動画の内容に沿った文、ストリームURLはローカル HLS (m3u8) をレコードごとに置く。
 */
export const videoListItems: readonly VideoListItem[] = [
  {
    id: 'video-product-ui',
    title: '製品UIデモ：ダッシュボード操作説明',
    description: 'ダッシュボードの統計カードと最近のアップロード一覧を、実際の製品画面に沿って操作しながら解説しています。',
    streamUrl: 'http://localhost:8080/hls/video-product-ui/index.m3u8',
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
    description: '社内向けにサービスの全体構成とモジュール分割、リクエストの流れをホワイトボードで解説した研修セッションです。',
    streamUrl: 'http://localhost:8080/hls/video-training/index.m3u8',
    duration: '15:20',
    size: '284.1 MB',
    uploadedAt: '2026/03/10 13:05',
    status: 'unpublished',
    thumbnailSrc: '/images/thumb-training-distribution.png',
    thumbnailAlt: '社内研修動画のサムネイル',
  },
  {
    id: 'video-brand-movie',
    title: 'ブランドムービー：夕暮れの山並み',
    description: '夕暮れの山並みを背景に、ブランドの世界観を短編映像で伝えるムービーです。',
    streamUrl: 'http://localhost:8080/hls/video-brand-movie/index.m3u8',
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
    description: '導入を検討している担当者へのオンライン面談を収録し、利用シーンと運用上の懸念を聞き取っています。',
    streamUrl: 'http://localhost:8080/hls/video-interview/index.m3u8',
    duration: '08:12',
    size: '192.4 MB',
    uploadedAt: '2026/03/09 17:45',
    status: 'unpublished',
    thumbnailSrc: '/images/thumb-interview.png',
    thumbnailAlt: 'オンライン面談動画のサムネイル',
  },
  {
    id: 'video-coding-session',
    title: '技術解説：ライブコーディングセッション',
    description: '画面実装とコードの対応を追いながら、コンポーネント分割の手順をライブで解説しています。',
    streamUrl: 'http://localhost:8080/hls/video-coding-session/index.m3u8',
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
    description: '初回ログインから動画のアップロード、公開設定までの導入手順を画面操作つきで案内しています。',
    streamUrl: 'http://localhost:8080/hls/video-introduction-procedures/index.m3u8',
    duration: '12:15',
    size: '210.3 MB',
    uploadedAt: '2026/03/08 15:40',
    status: 'published',
    thumbnailSrc: '/images/thumb-introduction-procedures.png',
    thumbnailAlt: '導入手順チュートリアル動画のサムネイル',
  },
]
