<script setup lang="ts">
import { productName } from '~/constants/dashboard'
import { signupTagline, signupTitle } from '~/constants/signup'
</script>

<template>
  <div class="branding">
    <div class="logo">
      <div class="logo-mark">
        <AppIcon name="play-circle" :size="22" />
      </div>
      <span class="logo-text">{{ productName }}</span>
    </div>
    <div class="title-block">
      <h1 class="title">
        {{ signupTitle }}
      </h1>
      <p class="tagline">
        {{ signupTagline }}
      </p>
    </div>
  </div>
</template>
