import { videoStatusLabel } from './dashboard'

/**
 * hug 幅のラベルは Figma `screen-upload` のテキスト幅（CJK 1em）から取る。
 * ページタイトルは既存のアップロードボタン文言（9em = 198px）を再利用する。
 */
export const selectFileButtonLabel = 'ファイルを選択'
export const dropZoneTitle = 'ファイルをドラッグ＆ドロップ'
export const dropZoneSubtitle = 'または下のボタンから選択'
export const freeUploadLimitNote
  = '無料会員は動画を1本までアップロードできます。複数本のアップロードは有料会員で利用できます。'
export const paidUploadMultipleNote = '複数の動画をまとめて選択できます。'
export const conversionPipelineTitle = '変換パイプライン進捗状況'
export const conversionProgressLabel = '適応ビットレート動画を生成しています'
export const conversionProgressCompleteLabel = '配信準備が完了しました'
export const conversionProgressLabelByStep: Record<string, string> = {
  upload: '動画をアップロードしています',
  transcode: conversionProgressLabel,
  distribute: '配信準備をしています',
}
export const conversionPipelineNote
  = `アップロードした動画は、自動的に複数ビットレートへ変換され、完了後はHLS形式で配信できます。変換中は動画一覧のステータスが${videoStatusLabel.unpublished}と表示されます。`

export const conversionStepLabel: Record<string, string> = {
  upload: 'アップロード',
  transcode: '変換処理',
  distribute: '配信準備',
}
