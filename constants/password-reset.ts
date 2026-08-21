/**
 * パスワード再設定画面の表示文言。
 * メールは送らない。再設定操作の有無だけを画面遷移で表す。
 * メール欄のラベルと placeholder は login と同一のため複製しない。
 * ログイン画面へのリンク文言は、会員登録の「ログインはこちら」とは別指定。
 */
export const passwordResetTitle = 'パスワード再設定'
export const passwordResetButtonLabel = 'パスワード再設定'
export const loginScreenLinkLabel = 'ログイン画面へ'
export const passwordResetSentTitle = 'パスワード再設定メール送信完了'

export {
  emailFieldLabel,
  emailPlaceholder,
} from './login'
