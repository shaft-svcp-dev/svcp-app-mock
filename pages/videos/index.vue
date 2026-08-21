<script setup lang="ts">
import { productName, videoListStatusQueryParam } from '~/mocks/dashboard'
import type { VideoListStatusFilter } from '~/mocks/videos'
import {
  excludeDeletedVideos,
  videoListItems,
  videoListTitle,
} from '~/mocks/videos'

definePageMeta({
  screenClass: 'screen-video-list',
})

useHead({
  title: `${videoListTitle} | ${productName}`,
})

const { deletedIds } = useDeletedVideoIds()

function statusFilterFromQuery(value: unknown): VideoListStatusFilter {
  // 同一キーの重複は配列。published / unpublished 以外は絞り込みなし
  const raw = Array.isArray(value) ? value[0] : value
  if (raw === 'published' || raw === 'unpublished') {
    return raw
  }
  return 'all'
}

const route = useRoute()
const searchQuery = ref('')
const statusFilter = ref<VideoListStatusFilter>(
  statusFilterFromQuery(route.query[videoListStatusQueryParam]),
)

// ダッシュボードの件数カード（クエリ付き）と一覧ナビ（クエリなし）の同一ページ遷移を反映する
watch(
  () => route.query[videoListStatusQueryParam],
  (value) => {
    statusFilter.value = statusFilterFromQuery(value)
  },
)

function uploadedAtTime(value: string): number {
  // Figma の表示形式 `YYYY/MM/DD HH:mm` を Date.parse できるハイフン区切りにする
  return Date.parse(value.replaceAll('/', '-'))
}

const visibleVideos = computed(() => {
  const normalizedSearch = searchQuery.value.trim()

  return excludeDeletedVideos(videoListItems, deletedIds.value)
    .filter((video) => {
      const matchesStatus = statusFilter.value === 'all' || video.status === statusFilter.value
      const matchesSearch = normalizedSearch === '' || video.title.includes(normalizedSearch)
      return matchesStatus && matchesSearch
    })
    .sort((left, right) => uploadedAtTime(right.uploadedAt) - uploadedAtTime(left.uploadedAt))
})
</script>

<template>
  <AppHeader :title="videoListTitle">
    <template #actions>
      <AppHeaderActions />
    </template>
  </AppHeader>
  <div class="page-body">
    <VideoListFilterRow
      v-model:query="searchQuery"
      v-model:status-filter="statusFilter"
    />
    <VideoListTable :videos="visibleVideos" />
  </div>
</template>
