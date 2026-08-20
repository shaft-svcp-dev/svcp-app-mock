/**
 * UIモック。API未接続のため、画面表示専用の固定データ。
 * ラベルは Figma `screen-video-detail` のテキスト幅（CJK 1em）から取る。
 * レコード値は動画一覧の該当行を使い、CSS に無い説明文・ストリームURLは置かない。
 */
export const videoDetailTitle = '動画詳細'
export const cancelButtonLabel = 'キャンセル'
export const saveButtonLabel = '変更を保存'
export const titleFieldLabel = '動画タイトル'
export const descriptionFieldLabel = '説明'
export const visibilitySectionTitle = '公開設定'
export const publishToggleLabel = '動画を公開する'
export const streamUrlSectionTitle = 'ストリームURL'
export const copyButtonLabel = 'コピー'
export const metadataSectionTitle = 'メタデータ（読み取り専用）'

export const metadataRowLabels: readonly string[] = [
  'ステータス',
  '再生時間',
  'アップロード日',
  'ファイルサイズ',
]
