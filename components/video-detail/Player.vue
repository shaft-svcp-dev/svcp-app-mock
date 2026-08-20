<script setup lang="ts">
import type { VideoListItem } from '~/mocks/videos'

defineProps<{
  video: VideoListItem
}>()
</script>

<template>
  <div
    class="video-player-container"
    :style="{
      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${video.thumbnailSrc})`,
    }"
    :aria-label="video.thumbnailAlt"
  >
    <button class="play-button" type="button">
      <AppIcon name="play-circle" :size="32" />
    </button>
  </div>
</template>
