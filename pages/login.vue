<script setup lang="ts">
// ページ名 Login と prefix Login* が重なり、自動解決がページ変換に乗らない
import LoginBranding from '~/components/login/Branding.vue'
import LoginFormFields from '~/components/login/FormFields.vue'
import LoginSubmit from '~/components/login/Submit.vue'
import { productName } from '~/constants/dashboard'
import { loginTitle } from '~/constants/login'
import { authStorageValue } from '~/mocks/login'
import { dashboardPath } from '~/routes'

definePageMeta({
  layout: false,
})

useHead({
  title: `${loginTitle} | ${productName}`,
})

const email = ref('test@shaft.bz')
const password = ref('testtest')
const authenticated = useAuthStorage()

async function onSubmit() {
  // API 未接続のため資格情報は検証せず、ログイン操作の有無だけを残す
  authenticated.value = authStorageValue
  await navigateTo(dashboardPath)
}
</script>

<template>
  <div class="screen-login">
    <form class="login-card" @submit.prevent="onSubmit">
      <LoginBranding />
      <LoginFormFields v-model:email="email" v-model:password="password" />
      <LoginSubmit />
    </form>
  </div>
</template>
