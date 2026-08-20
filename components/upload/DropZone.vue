<script setup lang="ts">
import {
  dropZoneSubtitle,
  dropZoneTitle,
  selectFileButtonLabel,
} from '~/mocks/upload'
</script>

<template>
  <div class="drop-zone">
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
    >
      {{ selectFileButtonLabel }}
    </button>
  </div>
</template>
