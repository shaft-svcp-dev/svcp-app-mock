<script setup lang="ts">
import { loginLinkLabel, loginPath, signupButtonLabel } from '~/mocks/signup'
</script>

<template>
  <div class="action-buttons">
    <button class="btn" type="submit">
      <span class="btn-label">{{ signupButtonLabel }}</span>
    </button>
    <NuxtLink class="login-link" :to="loginPath">
      {{ loginLinkLabel }}
    </NuxtLink>
  </div>
</template>
