/**
 * UIモック。API未接続のため、画面表示専用の固定データ。
 * アカウント値は登録画面と同じ項目（会社名・氏名・メール）だけ持つ。パスワードは持たない。
 * 氏名はサイドバーのユーザーと同一人物にする。
 */
import { dashboardUser } from './dashboard'

export const settingsTitle = '設定'
export const settingsPath = '/settings'
export const accountSectionTitle = 'アカウント情報'
export const deleteAccountButtonLabel = 'アカウントを削除'
export const deleteAccountConfirmTitle = '削除確認'
export const deleteAccountConfirmMessage = 'アカウントを削除しますか？'
export const deleteAccountConfirmOkLabel = 'OK'
export const deleteAccountConfirmCancelLabel = 'キャンセル'

export interface RegisteredAccount {
  companyName: string
  fullName: string
  email: string
}

export const registeredAccount: RegisteredAccount = {
  companyName: 'Example Inc.',
  fullName: dashboardUser.name,
  email: 'tanaka.taro@example.com',
}

export function maskEmail(email: string): string {
  const atIndex = email.indexOf('@')
  // @ が無い、またはローカル部が空ならマスク対象にできない
  if (atIndex <= 0) {
    return email
  }

  const local = email.slice(0, atIndex)
  const domain = email.slice(atIndex + 1)
  // 先頭1文字以外を隠す。1文字のローカル部は * を足して長さ1と分からないようにする
  const hiddenLength = Math.max(local.length - 1, 1)
  return `${local.slice(0, 1)}${'*'.repeat(hiddenLength)}@${domain}`
}
