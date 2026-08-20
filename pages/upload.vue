<script setup lang="ts">
import { productName, uploadButtonLabel } from '~/mocks/dashboard'
import { uploadingFile } from '~/mocks/upload'

definePageMeta({
  screenClass: 'screen-upload',
})

// Figma header-title は 9em。既存の「動画をアップロード」と一致するため複製しない
useHead({
  title: `${uploadButtonLabel} | ${productName}`,
})
</script>

<template>
  <AppHeader :title="uploadButtonLabel" />
  <div class="page-body">
    <div class="upload-card">
      <UploadDropZone />
      <UploadConversionPipeline />
      <UploadFileInfo :file="uploadingFile" />
    </div>
  </div>
</template>
