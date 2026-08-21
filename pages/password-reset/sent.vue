<script setup lang="ts">
// 同一チE��レクトリの prefix 解決に寁E��、完亁E��面でめEBranding は明示 import する
import PasswordResetBranding from '~/components/password-reset/Branding.vue'
import { productName } from '~/constants/dashboard'
import {
  loginScreenLinkLabel,
  passwordResetSentTitle,
} from '~/constants/password-reset'
import { loginPath } from '~/routes'

definePageMeta({
  layout: false,
})

useHead({
  title: `${passwordResetSentTitle} | ${productName}`,
})
</script>

<template>
  <div class="screen-password-reset-sent">
    <div class="password-reset-card">
      <PasswordResetBranding :title="passwordResetSentTitle" />
      <NuxtLink class="login-link" :to="loginPath">
        {{ loginScreenLinkLabel }}
      </NuxtLink>
    </div>
  </div>
</template>
