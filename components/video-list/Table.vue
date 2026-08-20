<script setup lang="ts">
import type { VideoListItem } from '~/mocks/videos'
import { videoStatusLabel } from '~/mocks/dashboard'
import { videoTableColumns } from '~/mocks/videos'

defineProps<{
  videos: readonly VideoListItem[]
}>()
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
      <article
        v-for="video in videos"
        :key="video.id"
        class="table-row"
      >
        <img
          class="col-thumbnail video-thumb"
          :src="video.thumbnailSrc"
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
      </article>
    </div>
  </div>
</template>
