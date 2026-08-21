import type { VideoListStatusFilter } from '~/mocks/videos'
import { videoStatusLabel } from './dashboard'

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
