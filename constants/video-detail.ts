/**
 * 動画詳細の表示文言。
 * ラベルは Figma `screen-video-detail` のテキスト幅（CJK 1em）から取る。
 * サムネイル・字幕の項目名は Figma に無い設定ブロック用の画面コピー。
 */
export const videoDetailTitle = '動画詳細'
export const cancelButtonLabel = 'キャンセル'
export const saveButtonLabel = '変更を保存'
export const deleteButtonLabel = '削除'
export const deleteConfirmTitle = '削除確認'
export const deleteConfirmMessage = 'この動画を削除しますか？'
export const deleteConfirmOkLabel = 'OK'
// ヘッダーの cancelButtonLabel（一覧へ戻る）と役割が違うため、ダイアログ用に分けておく
export const deleteConfirmCancelLabel = 'キャンセル'
export const titleFieldLabel = '動画タイトル'
export const descriptionFieldLabel = '説明'
export const visibilitySectionTitle = '公開設定'
export const publishToggleLabel = '動画を公開する'
export const streamUrlSectionTitle = 'ストリームURL'
export const copyButtonLabel = 'コピー'
// トースト用の共通部品は他画面に無い。成功は既存コピーボタンの文言差し替えで伝える
export const copySuccessLabel = 'コピーしました'
export const metadataSectionTitle = 'メタデータ（読み取り専用）'
export const metadataRowLabels: readonly string[] = [
  'ステータス',
  '再生時間',
  'アップロード日',
  'ファイルサイズ',
]
export const thumbnailSectionTitle = 'サムネイル設定'
export const thumbnailUploadLabel = '画像を選択'
export const thumbnailResetLabel = '元の画像に戻す'
export const thumbnailHint = 'PNG・JPEG・WebPを設定できます。'
export const subtitleSectionTitle = '字幕設定'
export const subtitleUploadLabel = '字幕ファイルを追加'
export const subtitleEmptyMessage = '字幕ファイルはまだ追加されていません'
export const subtitleRemoveLabel = '削除'
export const subtitleHint = 'WebVTT（.vtt）を追加すると、プレーヤーで字幕を選べます。'
export const subtitleLanguageFieldLabel = '言語'
export const subtitleLanguageOptions: readonly {
  value: string
  label: string
}[] = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: '英語' },
]
