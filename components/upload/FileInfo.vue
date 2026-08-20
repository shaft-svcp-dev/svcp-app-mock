<script setup lang="ts">
import type { UploadingFile } from '~/mocks/upload'

defineProps<{
  file: UploadingFile
}>()
</script>

<template>
  <div class="file-info-card">
    <AppIcon name="file-video" :size="24" />
    <div class="file-details">
      <span class="file-name">{{ file.filename }}</span>
      <span class="file-metadata">{{ file.metadata }}</span>
    </div>
  </div>
</template>
