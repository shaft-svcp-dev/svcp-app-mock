<script setup lang="ts">
// ページ名 PasswordReset と prefix PasswordReset* が重なり、自動解決がページ変換に乗らない
import PasswordResetBranding from '~/components/password-reset/Branding.vue'
import PasswordResetFormFields from '~/components/password-reset/FormFields.vue'
import PasswordResetSubmit from '~/components/password-reset/Submit.vue'
import { productName } from '~/constants/dashboard'
import { passwordResetTitle } from '~/constants/password-reset'
import { passwordResetSentPath } from '~/routes'

definePageMeta({
  layout: false,
})

useHead({
  title: `${passwordResetTitle} | ${productName}`,
})

const email = ref('')

async function onSubmit() {
  // モックのためメールは送らず、再設定操作の有無だけを画面遷移で残す
  await navigateTo(passwordResetSentPath)
}
</script>

<template>
  <div class="screen-password-reset">
    <form class="password-reset-card" @submit.prevent="onSubmit">
      <PasswordResetBranding :title="passwordResetTitle" />
      <PasswordResetFormFields v-model:email="email" />
      <PasswordResetSubmit />
    </form>
  </div>
</template>
