import {
  deletedVideoIdsCookieName,
  parseDeletedVideoIds,
} from '~/mocks/videos'

export function useDeletedVideoIds() {
  // 既定の JSON decode だとカンマ区切りの id をパースできず一致しなくなる
  const deletedIdsCookie = useCookie(deletedVideoIdsCookieName, {
    encode: value => encodeURIComponent(String(value ?? '')),
    decode: value => decodeURIComponent(value),
  })

  const deletedIds = computed(() => parseDeletedVideoIds(deletedIdsCookie.value))

  function markDeleted(id: string) {
    const next = [...new Set([...deletedIds.value, id])]
    deletedIdsCookie.value = next.join(',')
  }

  return { deletedIds, markDeleted }
}
