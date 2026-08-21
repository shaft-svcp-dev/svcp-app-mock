import {
  isPaidMembership,
  membershipCookieName,
  paidMembershipValue,
} from '~/mocks/settings'

export function useMembership() {
  // 認証 Cookie と同じく生文字列で持つ。既定の JSON decode だと生の paid をパースできず一致しなくなる
  const membership = useCookie(membershipCookieName, {
    encode: value => encodeURIComponent(String(value ?? '')),
    decode: value => decodeURIComponent(value),
  })

  const isPaid = computed(() => isPaidMembership(membership.value))

  function markPaid() {
    membership.value = paidMembershipValue
  }

  return { isPaid, markPaid }
}
