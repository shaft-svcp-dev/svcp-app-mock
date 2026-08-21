<script setup lang="ts">
import { loginLinkLabel, signupButtonLabel } from '~/constants/signup'
import { loginPath } from '~/routes'
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
