<script setup lang="ts">
import { loginScreenLinkLabel, passwordResetButtonLabel } from '~/constants/password-reset'
import { loginPath } from '~/routes'
</script>

<template>
  <div class="password-reset-actions">
    <button class="btn" type="submit">
      <span class="btn-label">{{ passwordResetButtonLabel }}</span>
    </button>
    <NuxtLink class="login-link" :to="loginPath">
      {{ loginScreenLinkLabel }}
    </NuxtLink>
  </div>
</template>
