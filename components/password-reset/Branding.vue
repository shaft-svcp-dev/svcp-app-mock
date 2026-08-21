<script setup lang="ts">
import { productName } from '~/mocks/dashboard'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="branding">
    <div class="logo">
      <div class="logo-mark">
        <AppIcon name="play-circle" :size="24" />
      </div>
      <span class="logo-text">{{ productName }}</span>
    </div>
    <h1 class="title">
      {{ title }}
    </h1>
  </div>
</template>
