/**
 * UIモック。API未接続のため、画面表示専用の固定データ。
 * ラベル・ボタン・リンクは Figma `screen-login` のテキスト幅（CJK 1em）とレイヤー名から取る。
 * placeholder は Inter 14px の hug 幅（128px / 63px）から復元する。
 * tagline 文字列は CSS に無い。高さ 36px / line-height 18px の2行枠に、既存画面の用途を1文で置く。
 */
export const loginTitle = 'ログイン'
export const loginTagline = '動画のアップロードから変換、配信までを一括で管理できます'
export const emailFieldLabel = 'メールアドレス'
export const passwordFieldLabel = 'パスワード'
export const emailPlaceholder = 'name@example.com'
export const passwordPlaceholder = 'Password'
export const loginButtonLabel = 'ログイン'
export const signupPromptLabel = 'アカウントをお持ちですか？'
export const signupLinkLabel = '会員登録はこちら'
export const signupPath = '/signup'
export const loginPath = '/login'

// 資格情報は持たない。ログイン操作の有無だけを Cookie で表す
export const authCookieName = 'svcp-authenticated'
export const authCookieValue = '1'
