<script setup lang="ts">
// 繝壹・繧ｸ蜷・Settings 縺ｨ prefix Settings* 縺碁㍾縺ｪ繧翫∬・蜍戊ｧ｣豎ｺ縺後・繝ｼ繧ｸ螟画鋤縺ｫ荵励ｉ縺ｪ縺・import SettingsAccountInfo from '~/components/settings/AccountInfo.vue'
import SettingsDeleteDialog from '~/components/settings/DeleteDialog.vue'
import SettingsMembershipStatus from '~/components/settings/MembershipStatus.vue'
import SettingsPaymentCompleteDialog from '~/components/settings/PaymentCompleteDialog.vue'
import SettingsPaymentForm from '~/components/settings/PaymentForm.vue'
import { productName } from '~/constants/dashboard'
import { deleteAccountButtonLabel, settingsTitle } from '~/constants/settings'
import { loginPath } from '~/routes'
import {
  maskEmail,
  registeredAccount,
} from '~/mocks/settings'

definePageMeta({
  screenClass: 'screen-settings',
})

useHead({
  title: `${settingsTitle} | ${productName}`,
})

const authenticated = useAuthStorage()
const { isPaid, markPaid } = useMembership()
const deleteDialogOpen = ref(false)
const paymentCompleteOpen = ref(false)
const maskedEmail = maskEmail(registeredAccount.email)

function openDeleteDialog() {
  deleteDialogOpen.value = true
}

async function confirmDelete() {
  // 繝｢繝・け縺ｫ蜑企勁 API 縺ｯ辟｡縺・ゅΟ繧ｰ繧｢繧ｦ繝医→蜷後§縺剰ｪ崎ｨｼ迥ｶ諷九ｒ豸医＠縺ｦ繝ｭ繧ｰ繧､繝ｳ縺ｸ謌ｻ縺・  authenticated.value = null
  await navigateTo(loginPath)
}

function onPay() {
  // 繧ｫ繝ｼ繝画ュ蝣ｱ縺ｯ騾√ｉ縺ｪ縺・ょｮ御ｺ・ム繧､繧｢繝ｭ繧ｰ縺縺大・縺励※豎ｺ貂医＠縺溘ｈ縺・↓隕九○繧・  paymentCompleteOpen.value = true
}

function confirmPayment() {
  markPaid()
}
</script>

<template>
  <AppHeader :title="settingsTitle">
    <template #actions>
      <button
        class="btn-outline header-delete"
        type="button"
        @click="openDeleteDialog"
      >
        <span class="btn-label">{{ deleteAccountButtonLabel }}</span>
      </button>
    </template>
  </AppHeader>
  <div class="page-body">
    <SettingsAccountInfo
      :company-name="registeredAccount.companyName"
      :full-name="registeredAccount.fullName"
      :email="maskedEmail"
    />
    <SettingsMembershipStatus :paid="isPaid" />
    <SettingsPaymentForm
      v-if="!isPaid"
      @pay="onPay"
    />
  </div>
  <SettingsDeleteDialog
    v-model:open="deleteDialogOpen"
    @confirm="confirmDelete"
  />
  <SettingsPaymentCompleteDialog
    v-model:open="paymentCompleteOpen"
    @confirm="confirmPayment"
  />
</template>
