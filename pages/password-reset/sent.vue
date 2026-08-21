<script setup lang="ts">
// 同一ディレクトリの prefix 解決に寄せ、完了画面でも Branding は明示 import する
import PasswordResetBranding from '~/components/password-reset/Branding.vue'
import { productName } from '~/mocks/dashboard'
import {
  loginPath,
  loginScreenLinkLabel,
  passwordResetSentTitle,
} from '~/mocks/password-reset'

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
