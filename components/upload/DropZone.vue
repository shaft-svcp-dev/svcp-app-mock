<script setup lang="ts">
import {
  dropZoneSubtitle,
  dropZoneTitle,
  selectFileButtonLabel,
} from '~/constants/upload'
import { videoFileAccept } from '~/mocks/upload'

defineProps<{
  multiple: boolean
}>()

const emit = defineEmits<{
  select: [files: File[]]
}>()

const fileInput = ref<HTMLInputElement | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}

function filesFromList(list: FileList | null | undefined): File[] {
  return list ? [...list] : []
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  emit('select', filesFromList(input.files))
  input.value = ''
}

function onDragOver(event: DragEvent) {
  // preventDefault しなぁE�� drop がファイルを開くブラウザ既定動作になめE  event.preventDefault()
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  emit('select', filesFromList(event.dataTransfer?.files))
}
</script>

<template>
  <div
    class="drop-zone"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <input
      ref="fileInput"
      class="file-input-hidden"
      type="file"
      :accept="videoFileAccept"
      :multiple="multiple"
      :aria-label="selectFileButtonLabel"
      @change="onFileChange"
    >
    <div class="cloud-icon">
      <AppIcon name="cloud-upload" :size="32" />
    </div>
    <div class="text-group">
      <p class="drop-title">
        {{ dropZoneTitle }}
      </p>
      <p class="drop-subtitle">
        {{ dropZoneSubtitle }}
      </p>
    </div>
    <button
      type="button"
      class="btn-outline select-file-btn"
      @click="openFilePicker"
    >
      {{ selectFileButtonLabel }}
    </button>
  </div>
</template>
