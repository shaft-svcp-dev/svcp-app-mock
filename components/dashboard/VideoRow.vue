<script setup lang="ts">
import type { RecentUpload } from '~/mocks/dashboard'
import { videoStatusLabel } from '~/constants/dashboard'
import { videoListPath } from '~/routes'

defineProps<{
  upload: RecentUpload
}>()
</script>

<template>
  <NuxtLink
    class="video-row"
    :to="`${videoListPath}/${upload.id}`"
  >
    <img
      class="video-thumb"
      :src="upload.thumbnailSrc"
      :alt="upload.thumbnailAlt"
    >
    <div class="meta-content">
      <h3 class="video-title">
        {{ upload.title }}
      </h3>
      <div class="submeta">
        <span>{{ upload.duration }}</span>
        <span class="submeta-dot" aria-hidden="true">•</span>
        <span>{{ upload.size }}</span>
        <span class="submeta-dot" aria-hidden="true">•</span>
        <span>{{ upload.uploadedAt }}</span>
      </div>
    </div>
    <div class="badge" :class="`badge-${upload.status}`">
      <span class="badge-label">{{ videoStatusLabel[upload.status] }}</span>
    </div>
  </NuxtLink>
</template>
