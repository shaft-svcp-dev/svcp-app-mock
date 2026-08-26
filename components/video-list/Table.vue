<script setup lang="ts">
import { videoStatusLabel } from '~/constants/dashboard'
import { videoTableColumns } from '~/constants/videos'
import type { VideoListItem } from '~/mocks/videos'
import { videoListPath } from '~/routes'

defineProps<{
  videos: readonly VideoListItem[]
}>()

const toPublicSrc = usePublicAssetPath()
</script>

<template>
  <div class="table-card">
    <div class="table-header">
      <span
        v-for="column in videoTableColumns"
        :key="column.id"
        class="table-heading"
        :class="`col-${column.id}`"
      >
        {{ column.label }}
      </span>
    </div>
    <div class="table-body">
      <NuxtLink
        v-for="video in videos"
        :key="video.id"
        class="table-row"
        :to="`${videoListPath}/${video.id}`"
      >
        <img
          class="col-thumbnail video-thumb"
          :src="toPublicSrc(video.thumbnailSrc)"
          :alt="video.thumbnailAlt"
        >
        <span class="col-title table-title">{{ video.title }}</span>
        <span class="col-duration table-cell">{{ video.duration }}</span>
        <span class="col-size table-cell">{{ video.size }}</span>
        <div class="col-status">
          <div class="badge" :class="`badge-${video.status}`">
            <span class="badge-label">{{ videoStatusLabel[video.status] }}</span>
          </div>
        </div>
        <span class="col-uploadedAt table-cell">{{ video.uploadedAt }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
