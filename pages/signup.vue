<script setup lang="ts">
// ページ名 Signup と prefix Signup* が重なり、自動解決がページ変換に乗らない
import SignupBranding from '~/components/signup/Branding.vue'
import SignupFormFields from '~/components/signup/FormFields.vue'
import SignupSubmit from '~/components/signup/Submit.vue'
import SignupTermsConsent from '~/components/signup/TermsConsent.vue'
import { productName } from '~/mocks/dashboard'
import { authStorageValue } from '~/mocks/login'
import { signupTitle } from '~/mocks/signup'

definePageMeta({
  layout: false,
})

useHead({
  title: `${signupTitle} | ${productName}`,
})

const companyName = ref('')
const fullName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
// Figma の checkbox-box は選択済み表示。初期値だけ合わせ、保存はしない
const termsAgreed = ref(true)
const authenticated = useAuthStorage()

async function onSubmit() {
  // API 未接続のため入力値は保存せず、登録操作の有無だけを残す
  authenticated.value = authStorageValue
  await navigateTo('/')
}
</script>

<template>
  <div class="screen-signup">
    <form class="registration-card" @submit.prevent="onSubmit">
      <SignupBranding />
      <SignupFormFields
        v-model:company-name="companyName"
        v-model:full-name="fullName"
        v-model:email="email"
        v-model:password="password"
        v-model:password-confirm="passwordConfirm"
      />
      <SignupTermsConsent v-model="termsAgreed" />
      <SignupSubmit />
    </form>
  </div>
</template>
