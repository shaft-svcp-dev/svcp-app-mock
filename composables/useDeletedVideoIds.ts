import {
  deletedVideoIdsStorageKey,
  parseDeletedVideoIds,
} from '~/mocks/videos'

export function useDeletedVideoIds() {
  const raw = useClientStorage(deletedVideoIdsStorageKey)
  const deletedIds = computed(() => parseDeletedVideoIds(raw.value))

  function markDeleted(id: string) {
    const next = [...new Set([...deletedIds.value, id])]
    raw.value = next.join(',')
  }

  return { deletedIds, markDeleted }
}
