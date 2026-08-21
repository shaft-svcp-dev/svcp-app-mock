import { videoStatusLabel } from './dashboard'
import { videoListItems } from './videos'

/**
 * UIモック。API未接続のため、画面表示専用の固定データ。
 * hug 幅のラベルは Figma `screen-upload` のテキスト幅（CJK 1em）から取る。
 * ページタイトルは既存のアップロードボタン文言（9em = 198px）を再利用する。
 * 変換中ファイルは一覧の unpublished レコード。filename 枠は stretch のため幅から復元できない。
 */
export type ConversionStepStatus = 'complete' | 'active' | 'pending'

export interface ConversionStep {
  id: string
  label: string
  status: ConversionStepStatus
}

export interface UploadingFile {
  filename: string
  metadata: string
}

export const selectFileButtonLabel = 'ファイルを選択'
export const dropZoneTitle = 'ファイルをドラッグ＆ドロップ'
export const dropZoneSubtitle = 'または下のボタンから選択'
export const videoFileAccept = 'video/mp4,video/webm,video/quicktime'
export const freeUploadLimit = 1
export const freeUploadLimitNote
  = '無料会員は動画を1本までアップロードできます。複数本のアップロードは有料会員で利用できます。'
export const paidUploadMultipleNote = '複数の動画をまとめて選択できます。'

export function isAllowedVideoFile(file: File): boolean {
  if (file.type.startsWith('video/')) {
    return true
  }

  return /\.(mp4|webm|mov)$/i.test(file.name)
}

export function limitSelectedFiles(files: readonly File[], isPaid: boolean): File[] {
  const allowed = files.filter(isAllowedVideoFile)
  if (isPaid) {
    return allowed
  }

  return allowed.slice(0, freeUploadLimit)
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  const kilobytes = bytes / 1024
  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`
  }

  return `${(kilobytes / 1024).toFixed(1)} MB`
}

export const conversionPipelineTitle = '変換パイプライン進捗状況'
export const conversionProgressLabel = '適応ビットレート動画を生成しています'
export const conversionProgressPercent = 72
export const conversionPipelineNote
  = `アップロードした動画は、自動的に複数ビットレートへ変換され、完了後はHLS形式で配信できます。変換中は動画一覧のステータスが${videoStatusLabel.unpublished}と表示されます。`

export const conversionSteps: readonly ConversionStep[] = [
  { id: 'upload', label: 'アップロード', status: 'complete' },
  { id: 'transcode', label: '変換処理', status: 'active' },
  { id: 'distribute', label: '配信準備', status: 'pending' },
]

const unpublishedVideo = videoListItems.find(video => video.status === 'unpublished')

if (!unpublishedVideo) {
  throw new Error('非公開中の動画が一覧モックにない')
}

export const uploadingFile: UploadingFile = {
  filename: unpublishedVideo.title,
  metadata: `${unpublishedVideo.duration} • ${unpublishedVideo.size}`,
}
