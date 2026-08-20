<script setup lang="ts">
import { uploadButtonLabel } from '~/mocks/dashboard'
import { videoListTitle } from '~/mocks/videos'
</script>

<template>
  <header class="header">
    <h1 class="header-title">
      {{ videoListTitle }}
    </h1>
    <div class="header-actions">
      <NuxtLink class="btn" to="/upload">
        <AppIcon name="plus" :size="16" />
        <span class="btn-label">{{ uploadButtonLabel }}</span>
      </NuxtLink>
    </div>
  </header>
</template>
