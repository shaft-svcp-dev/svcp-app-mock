import {
  isPaidMembership,
  membershipStorageKey,
  paidMembershipValue,
} from '~/mocks/settings'

export function useMembership() {
  const membership = useClientStorage(membershipStorageKey)
  const isPaid = computed(() => isPaidMembership(membership.value))

  function markPaid() {
    membership.value = paidMembershipValue
  }

  return { isPaid, markPaid }
}
