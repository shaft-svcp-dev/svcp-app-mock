<script setup lang="ts">
// 静止画サムネイルだけでは再生できないため、public のモック mp4 を video 要素で使う
import { videoPlaybackSrc } from '~/mocks/video-detail'
import type { VideoListItem } from '~/mocks/videos'

defineProps<{
  video: VideoListItem
}>()
</script>

<template>
  <div class="video-player-container">
    <video
      class="video-player"
      :src="videoPlaybackSrc"
      :poster="video.thumbnailSrc"
      :aria-label="video.thumbnailAlt"
      controls
      playsinline
    />
  </div>
</template>
