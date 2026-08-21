/**
 * アカウント値は登録画面と同じ項目（会社名・氏名・メール）だけ持つ。パスワードは持たない。
 * 氏名はサイドバーのユーザーと同一人物にする。
 */
import { dashboardUser } from './dashboard'

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

// 認証と同じく画面をまたいで会員種別を共有する。初期は localStorage なし＝無料会員
export const membershipStorageKey = 'svcp-membership'
export const paidMembershipValue = 'paid'

export function isPaidMembership(value: string | null | undefined): boolean {
  return value === paidMembershipValue
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
