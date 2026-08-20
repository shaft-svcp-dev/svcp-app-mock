<script setup lang="ts">
import { productName } from '~/mocks/dashboard'
import type { VideoListStatusFilter } from '~/mocks/videos'
import { videoListItems, videoListTitle } from '~/mocks/videos'

useHead({
  title: `${videoListTitle} | ${productName}`,
})

const query = ref('')
const statusFilter = ref<VideoListStatusFilter>('all')

function uploadedAtTime(value: string): number {
  // Figma の表示形式 `YYYY/MM/DD HH:mm` を Date.parse できるハイフン区切りにする
  return Date.parse(value.replaceAll('/', '-'))
}

const visibleVideos = computed(() => {
  const normalizedQuery = query.value.trim()

  return videoListItems
    .filter((video) => {
      const matchesStatus = statusFilter.value === 'all' || video.status === statusFilter.value
      const matchesQuery = normalizedQuery === '' || video.title.includes(normalizedQuery)
      return matchesStatus && matchesQuery
    })
    .sort((left, right) => uploadedAtTime(right.uploadedAt) - uploadedAtTime(left.uploadedAt))
})
</script>

<template>
  <div class="screen-video-list">
    <AppSidebar />
    <div class="main-content">
      <VideoListHeader />
      <div class="page-body">
        <VideoListFilterRow
          v-model:query="query"
          v-model:status-filter="statusFilter"
        />
        <VideoListTable :videos="visibleVideos" />
      </div>
    </div>
  </div>
</template>
