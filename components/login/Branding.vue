<script setup lang="ts">
import { productName } from '~/constants/dashboard'
import { loginTagline } from '~/constants/login'
</script>

<template>
  <div class="branding">
    <div class="logo">
      <div class="logo-mark">
        <AppIcon name="play-circle" :size="24" />
      </div>
      <span class="logo-text">{{ productName }}</span>
    </div>
    <p class="tagline">
      {{ loginTagline }}
    </p>
  </div>
</template>
