<script setup lang="ts">
// 静止画サムネイルだけでは再生できないため、public のモック mp4 を video 要素で使う
import type { VideoSubtitleTrack } from '~/mocks/video-detail'
import { videoPlaybackSrc } from '~/mocks/video-detail'
import type { VideoListItem } from '~/mocks/videos'

defineProps<{
  video: VideoListItem
  posterSrc: string
  subtitles: readonly VideoSubtitleTrack[]
}>()
</script>

<template>
  <div class="video-player-container">
    <video
      class="video-player"
      :src="videoPlaybackSrc"
      :poster="posterSrc"
      :aria-label="video.thumbnailAlt"
      controls
      playsinline
    >
      <!-- default が複数あるとブラウザは先頭だけ有効にするので、先頭トラックだけ default にする -->
      <track
        v-for="(track, index) in subtitles"
        :key="track.id"
        kind="subtitles"
        :src="track.src"
        :srclang="track.srclang"
        :label="track.label"
        :default="index === 0"
      >
    </video>
  </div>
</template>
