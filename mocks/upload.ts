export type ConversionStepStatus = 'complete' | 'active' | 'pending'
export type ConversionStepId = 'upload' | 'transcode' | 'distribute'

export interface ConversionStep {
  id: ConversionStepId
  status: ConversionStepStatus
}

export interface UploadingFile {
  filename: string
  metadata: string
}

export const videoFileAccept = 'video/mp4,video/webm,video/quicktime'
export const freeUploadLimit = 1
export const conversionStepIds = ['upload', 'transcode', 'distribute'] as const
// 実変換はしない。選択後に3ステップが順に完了して見える間隔
export const conversionStepDurationMs = 1000
export const conversionProgressTickMs = 50

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

export function pipelineTotalDurationMs(): number {
  return conversionStepDurationMs * conversionStepIds.length
}

export function progressPercentFromElapsed(elapsedMs: number, totalDurationMs: number): number {
  if (totalDurationMs <= 0) {
    return 100
  }

  return Math.min(100, Math.max(0, Math.round((elapsedMs / totalDurationMs) * 100)))
}

export function buildConversionSteps(
  progressPercent: number,
  started: boolean,
): ConversionStep[] {
  // 0% は未選択と開始直後で同じなので、開始前は進捗に関係なく pending にする
  if (!started) {
    return conversionStepIds.map(id => ({ id, status: 'pending' }))
  }

  const clamped = Math.min(100, Math.max(0, Math.round(progressPercent)))

  return conversionStepIds.map((id, index) => {
    const stepEndPercent = Math.round(((index + 1) / conversionStepIds.length) * 100)
    const stepStartPercent = Math.round((index / conversionStepIds.length) * 100)
    if (clamped >= stepEndPercent) {
      return { id, status: 'complete' }
    }

    if (clamped >= stepStartPercent) {
      return { id, status: 'active' }
    }

    return { id, status: 'pending' }
  })
}
