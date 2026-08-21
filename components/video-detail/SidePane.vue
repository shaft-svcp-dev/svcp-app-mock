<script setup lang="ts">
import { videoStatusLabel } from '~/constants/dashboard'
import type { VideoStatus } from '~/mocks/dashboard'
import type { VideoListItem } from '~/mocks/videos'
import {
  copyButtonLabel,
  copySuccessLabel,
  metadataRowLabels,
  metadataSectionTitle,
  publishToggleLabel,
  streamUrlSectionTitle,
  visibilitySectionTitle,
} from '~/constants/video-detail'

const props = defineProps<{
  video: VideoListItem
}>()

// バッジ表示もトグルに追従させるため、レコードの status ではなく画面のローカル状態を使う
const status = defineModel<VideoStatus>('status', { required: true })

function togglePublish() {
  status.value = status.value === 'published' ? 'unpublished' : 'published'
}

const [statusRowLabel, durationRowLabel, uploadedAtRowLabel, fileSizeRowLabel]
  = metadataRowLabels

const copied = ref(false)
let copiedResetTimer: ReturnType<typeof setTimeout> | undefined

async function copyStreamUrl() {
  await navigator.clipboard.writeText(props.video.streamUrl)
  copied.value = true
  if (copiedResetTimer !== undefined) {
    clearTimeout(copiedResetTimer)
  }
  // 成功表示に気づける長さ。短すぎると「コピー」のままに見える
  copiedResetTimer = setTimeout(() => {
    copied.value = false
    copiedResetTimer = undefined
  }, 2000)
}

onUnmounted(() => {
  if (copiedResetTimer !== undefined) {
    clearTimeout(copiedResetTimer)
  }
})
</script>

<template>
  <aside class="right-pane">
    <section class="section-visibility">
      <h2 class="section-title">
        {{ visibilitySectionTitle }}
      </h2>
      <div class="toggle-row">
        <span class="toggle-label">{{ publishToggleLabel }}</span>
        <button
          class="toggle-switch"
          :class="{ 'toggle-switch-on': status === 'published' }"
          type="button"
          role="switch"
          :aria-checked="status === 'published'"
          :aria-label="publishToggleLabel"
          @click="togglePublish"
        >
          <span class="switch-thumb" />
        </button>
      </div>
    </section>
    <div class="pane-divider" />
    <section class="section-stream-url">
      <h2 class="section-title">
        {{ streamUrlSectionTitle }}
      </h2>
      <div class="url-container">
        <span class="m3u8-url">{{ video.streamUrl }}</span>
        <button
          class="copy-btn"
          type="button"
          aria-live="polite"
          @click="copyStreamUrl"
        >
          <AppIcon :name="copied ? 'check' : 'file-stack'" :size="14" />
          <span class="copy-label">{{ copied ? copySuccessLabel : copyButtonLabel }}</span>
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
          <div class="badge" :class="`badge-${status}`">
            <span class="badge-label">{{ videoStatusLabel[status] }}</span>
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
