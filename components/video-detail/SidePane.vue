<script setup lang="ts">
import type { VideoListItem } from '~/mocks/videos'
import { videoStatusLabel } from '~/mocks/dashboard'
import {
  copyButtonLabel,
  metadataRowLabels,
  metadataSectionTitle,
  publishToggleLabel,
  streamUrlSectionTitle,
  visibilitySectionTitle,
} from '~/mocks/video-detail'

defineProps<{
  video: VideoListItem
}>()

const [statusRowLabel, durationRowLabel, uploadedAtRowLabel, fileSizeRowLabel]
  = metadataRowLabels
</script>

<template>
  <aside class="right-pane">
    <section class="section-visibility">
      <h2 class="section-title">
        {{ visibilitySectionTitle }}
      </h2>
      <div class="toggle-row">
        <span class="toggle-label">{{ publishToggleLabel }}</span>
        <div
          class="toggle-switch"
          :class="{ 'toggle-switch-on': video.status === 'published' }"
          role="switch"
          :aria-checked="video.status === 'published'"
          :aria-label="publishToggleLabel"
        >
          <span class="switch-thumb" />
        </div>
      </div>
    </section>
    <div class="pane-divider" />
    <section class="section-stream-url">
      <h2 class="section-title">
        {{ streamUrlSectionTitle }}
      </h2>
      <div class="url-container">
        <span class="m3u8-url" />
        <button class="copy-btn" type="button">
          <AppIcon name="file-stack" :size="14" />
          <span class="copy-label">{{ copyButtonLabel }}</span>
        </button>
      </div>
    </section>
    <div class="pane-divider" />
    <section class="section-metadata">
      <h2 class="section-title">
        {{ metadataSectionTitle }}
      </h2>
      <div class="meta-rows">
        <div class="meta-row">
          <span class="meta-label">{{ statusRowLabel }}</span>
          <div class="badge" :class="`badge-${video.status}`">
            <span class="badge-label">{{ videoStatusLabel[video.status] }}</span>
          </div>
        </div>
        <div class="meta-row">
          <span class="meta-label">{{ durationRowLabel }}</span>
          <span class="meta-value">{{ video.duration }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">{{ uploadedAtRowLabel }}</span>
          <span class="meta-value">{{ video.uploadedAt }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">{{ fileSizeRowLabel }}</span>
          <span class="meta-value">{{ video.size }}</span>
        </div>
      </div>
    </section>
  </aside>
</template>
