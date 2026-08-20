<script setup lang="ts">
import { productName } from '~/mocks/dashboard'
import { loginTagline } from '~/mocks/login'
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
