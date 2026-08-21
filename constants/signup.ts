import { loginTagline } from './login'

/**
 * 会員登録画面の表示文言。
 * ラベルは Figma レイヤー名から取る。
 * ボタンは 15px / 幅 60px（CJK 1em で4字）から「会員登録」と復元する。
 * タイトルは画面名「新規会員登録」。placeholder に hug 幅が無いため、
 * メール・パスワードは login を再利用し、会社名・氏名は login と同じ英語の入力形式にする。
 * tagline 文字列は CSS に無い。1行枠だが製品用途は login と同一のため複製しない。
 * ログインへの文字リンクは、ログイン画面の「会員登録はこちら」に対応する。
 */

export const signupTitle = '新規会員登録'
export const signupTagline = loginTagline
export const companyFieldLabel = '会社名'
export const fullNameFieldLabel = '氏名'
export const passwordConfirmFieldLabel = 'パスワード確認'
export const requiredFieldLabel = '必須'
export const companyPlaceholder = 'Company Name'
export const fullNamePlaceholder = 'Your Name'
export const termsConsentLabel = '利用規約に同意します'
export const signupButtonLabel = '会員登録'
export const loginLinkLabel = 'ログインはこちら'
export const passwordMismatchMessage = 'パスワードが一致しません'

export {
  emailFieldLabel,
  emailPlaceholder,
  passwordFieldLabel,
  passwordPlaceholder,
} from './login'
