import { videoListItems } from './videos'

/**
 * UIモック。API未接続のため、画面表示専用の固定データ。
 * 変換中ファイルは一覧の unpublished レコード。filename 枠は stretch のため幅から復元できない。
 */
export type ConversionStepStatus = 'complete' | 'active' | 'pending'

export interface ConversionStep {
  id: string
  status: ConversionStepStatus
}

export interface UploadingFile {
  filename: string
  metadata: string
}

export const videoFileAccept = 'video/mp4,video/webm,video/quicktime'
export const freeUploadLimit = 1
export const conversionProgressPercent = 72

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

export const conversionSteps: readonly ConversionStep[] = [
  { id: 'upload', status: 'complete' },
  { id: 'transcode', status: 'active' },
  { id: 'distribute', status: 'pending' },
]

const unpublishedVideo = videoListItems.find(video => video.status === 'unpublished')

if (!unpublishedVideo) {
  throw new Error('非公開中の動画が一覧モックにない')
}

export const uploadingFile: UploadingFile = {
  filename: unpublishedVideo.title,
  metadata: `${unpublishedVideo.duration} • ${unpublishedVideo.size}`,
}
