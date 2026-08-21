<script setup lang="ts">
// 繝壹・繧ｸ蜷・Signup 縺ｨ prefix Signup* 縺碁㍾縺ｪ繧翫∬・蜍戊ｧ｣豎ｺ縺後・繝ｼ繧ｸ螟画鋤縺ｫ荵励ｉ縺ｪ縺・import SignupBranding from '~/components/signup/Branding.vue'
import SignupFormFields from '~/components/signup/FormFields.vue'
import SignupSubmit from '~/components/signup/Submit.vue'
import SignupTermsConsent from '~/components/signup/TermsConsent.vue'
import { productName } from '~/constants/dashboard'
import { signupTitle } from '~/constants/signup'
import { authStorageValue } from '~/mocks/login'
import { dashboardPath } from '~/routes'

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
// Figma 縺ｮ checkbox-box 縺ｯ驕ｸ謚樊ｸ医∩陦ｨ遉ｺ縲ょ・譛溷､縺縺大粋繧上○縲∽ｿ晏ｭ倥・縺励↑縺・const termsAgreed = ref(true)
const authenticated = useAuthStorage()

async function onSubmit() {
  // API 譛ｪ謗･邯壹・縺溘ａ蜈･蜉帛､縺ｯ菫晏ｭ倥○縺壹∫匳骭ｲ謫堺ｽ懊・譛臥┌縺縺代ｒ谿九☆
  authenticated.value = authStorageValue
  await navigateTo(dashboardPath)
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
