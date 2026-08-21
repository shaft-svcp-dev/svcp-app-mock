// 資格情報は持たない。ログイン操作の有無だけを localStorage で表す
export const authStorageKey = 'svcp-authenticated'
export const authStorageValue = '1'

export function isAuthenticated(value: string | null | undefined): boolean {
  return value === authStorageValue
}
