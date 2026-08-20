<script setup lang="ts">
import {
  loginButtonLabel,
  signupLinkLabel,
  signupPath,
  signupPromptLabel,
} from '~/mocks/login'
</script>

<template>
  <div class="login-actions">
    <button class="btn" type="submit">
      <span class="btn-label">{{ loginButtonLabel }}</span>
    </button>
    <p class="link-to-login">
      <span class="signup-prompt">{{ signupPromptLabel }}</span>
      <NuxtLink class="signup-link" :to="signupPath">
        {{ signupLinkLabel }}
      </NuxtLink>
    </p>
  </div>
</template>
