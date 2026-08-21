<script setup lang="ts">
// 繝壹・繧ｸ蜷・PasswordReset 縺ｨ prefix PasswordReset* 縺碁㍾縺ｪ繧翫∬・蜍戊ｧ｣豎ｺ縺後・繝ｼ繧ｸ螟画鋤縺ｫ荵励ｉ縺ｪ縺・import PasswordResetBranding from '~/components/password-reset/Branding.vue'
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
  // 繝｢繝・け縺ｮ縺溘ａ繝｡繝ｼ繝ｫ縺ｯ騾√ｉ縺壹∝・險ｭ螳壽桃菴懊・譛臥┌縺縺代ｒ逕ｻ髱｢驕ｷ遘ｻ縺ｧ谿九☆
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
