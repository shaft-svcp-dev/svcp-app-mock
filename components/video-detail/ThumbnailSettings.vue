<script setup lang="ts">
import {
  thumbnailHint,
  thumbnailResetLabel,
  thumbnailSectionTitle,
  thumbnailUploadLabel,
} from '~/constants/video-detail'
import { thumbnailFileAccept } from '~/mocks/video-detail'

const src = defineModel<string>('src', { required: true })
const toPublicSrc = usePublicAssetPath()

const props = defineProps<{
  originalSrc: string
  alt: string
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isOriginal = computed(() => src.value === props.originalSrc)

function openFilePicker() {
  fileInput.value?.click()
}

function isAllowedThumbnail(file: File) {
  if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/webp') {
    return true
  }
  return /\.(png|jpe?g|webp)$/i.test(file.name)
}

function revokeIfBlob(url: string) {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
  }
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !isAllowedThumbnail(file)) {
    return
  }

  const previous = src.value
  src.value = URL.createObjectURL(file)
  revokeIfBlob(previous)
}

function reset() {
  const previous = src.value
  src.value = props.originalSrc
  revokeIfBlob(previous)
}

onUnmounted(() => {
  revokeIfBlob(src.value)
})
</script>

<template>
  <section
    class="section-thumbnail"
    aria-labelledby="thumbnail-settings-heading"
  >
    <input
      ref="fileInput"
      class="file-input-hidden"
      type="file"
      :accept="thumbnailFileAccept"
      :aria-label="thumbnailUploadLabel"
      @change="onFileChange"
    >
    <h2
      id="thumbnail-settings-heading"
      class="section-title"
    >
      {{ thumbnailSectionTitle }}
    </h2>
    <img
      class="thumbnail-preview"
      :src="toPublicSrc(src)"
      :alt="alt"
    >
    <p class="media-settings-hint">
      {{ thumbnailHint }}
    </p>
    <div class="media-settings-actions">
      <button
        class="btn thumbnail-upload"
        type="button"
        @click="openFilePicker"
      >
        <AppIcon name="image" :size="16" />
        <span class="btn-label">{{ thumbnailUploadLabel }}</span>
      </button>
      <button
        class="btn-outline thumbnail-reset"
        type="button"
        :disabled="isOriginal"
        @click="reset"
      >
        {{ thumbnailResetLabel }}
      </button>
    </div>
  </section>
</template>
