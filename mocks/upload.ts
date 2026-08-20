import { videoListItems } from './videos'

/**
 * UIモック。API未接続のため、画面表示専用の固定データ。
 * hug 幅のラベルは Figma `screen-upload` のテキスト幅（CJK 1em）から取る。
 * ページタイトルは既存のアップロードボタン文言（9em = 198px）を再利用する。
 * 変換中ファイルは一覧の processing レコード。filename 枠は stretch のため幅から復元できない。
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
export const conversionPipelineTitle = '変換パイプライン進捗状況'
export const conversionProgressLabel = '適応ビットレート動画を生成しています'
export const conversionProgressPercent = 72
export const conversionPipelineNote
  = 'アップロードした動画は、自動的に複数ビットレートへ変換され、完了後はHLS形式で配信できます。処理中は動画一覧のステータスが処理中と表示されます。'

export const conversionSteps: readonly ConversionStep[] = [
  { id: 'upload', label: 'アップロード', status: 'complete' },
  { id: 'transcode', label: '変換処理', status: 'active' },
  { id: 'distribute', label: '配信準備', status: 'pending' },
]

const processingVideo = videoListItems.find(video => video.status === 'processing')

if (!processingVideo) {
  throw new Error('変換中の動画が一覧モックにない')
}

export const uploadingFile: UploadingFile = {
  filename: processingVideo.title,
  metadata: `${processingVideo.duration} • ${processingVideo.size}`,
}
