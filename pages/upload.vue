<script setup lang="ts">
// ページ名 Upload と prefix Upload* が重なり、自動解決がページ変換に乗らない
import UploadConversionPipeline from '~/components/upload/ConversionPipeline.vue'
import UploadDropZone from '~/components/upload/DropZone.vue'
import UploadFileInfo from '~/components/upload/FileInfo.vue'
import { productName, uploadButtonLabel } from '~/mocks/dashboard'
import {
  formatFileSize,
  freeUploadLimitNote,
  limitSelectedFiles,
  paidUploadMultipleNote,
  uploadingFile,
  type UploadingFile,
} from '~/mocks/upload'

definePageMeta({
  screenClass: 'screen-upload',
})

// Figma header-title は 9em。既存の「動画をアップロード」と一致するため複製しない
useHead({
  title: `${uploadButtonLabel} | ${productName}`,
})

const { isPaid } = useMembership()
const selectedFiles = ref<File[]>([])

function onSelectFiles(files: File[]) {
  selectedFiles.value = limitSelectedFiles(files, isPaid.value)
}

const displayFiles = computed<UploadingFile[]>(() => {
  if (selectedFiles.value.length === 0) {
    return [uploadingFile]
  }

  return selectedFiles.value.map(file => ({
    filename: file.name,
    metadata: formatFileSize(file.size),
  }))
})
</script>

<template>
  <AppHeader :title="uploadButtonLabel" />
  <div class="page-body">
    <div class="upload-card">
      <p class="upload-limit-note">
        {{ isPaid ? paidUploadMultipleNote : freeUploadLimitNote }}
      </p>
      <UploadDropZone
        :multiple="isPaid"
        @select="onSelectFiles"
      />
      <UploadConversionPipeline />
      <UploadFileInfo
        v-for="(file, index) in displayFiles"
        :key="`${file.filename}-${index}`"
        :file="file"
      />
    </div>
  </div>
</template>
