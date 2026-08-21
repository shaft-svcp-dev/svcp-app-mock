<script setup lang="ts">
// 繝壹・繧ｸ蜷・Login 縺ｨ prefix Login* 縺碁㍾縺ｪ繧翫∬・蜍戊ｧ｣豎ｺ縺後・繝ｼ繧ｸ螟画鋤縺ｫ荵励ｉ縺ｪ縺・import LoginBranding from '~/components/login/Branding.vue'
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

const email = ref('')
const password = ref('')
const authenticated = useAuthStorage()

async function onSubmit() {
  // API 譛ｪ謗･邯壹・縺溘ａ雉・ｼ諠・ｱ縺ｯ讀懆ｨｼ縺帙★縲√Ο繧ｰ繧､繝ｳ謫堺ｽ懊・譛臥┌縺縺代ｒ谿九☆
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
