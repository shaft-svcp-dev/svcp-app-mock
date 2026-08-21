<script setup lang="ts">
import {
  forgotPasswordLinkLabel,
  forgotPasswordPromptLabel,
  loginButtonLabel,
  passwordResetPath,
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
    <p class="link-to-login">
      <span class="signup-prompt">{{ forgotPasswordPromptLabel }}</span>
      <NuxtLink class="signup-link" :to="passwordResetPath">
        {{ forgotPasswordLinkLabel }}
      </NuxtLink>
    </p>
  </div>
</template>
