<script setup lang="ts">
// ページ名 Settings と prefix Settings* が重なり、自動解決がページ変換に乗らない
import SettingsAccountInfo from '~/components/settings/AccountInfo.vue'
import SettingsDeleteDialog from '~/components/settings/DeleteDialog.vue'
import SettingsMembershipStatus from '~/components/settings/MembershipStatus.vue'
import SettingsPaymentCompleteDialog from '~/components/settings/PaymentCompleteDialog.vue'
import SettingsPaymentForm from '~/components/settings/PaymentForm.vue'
import { productName } from '~/mocks/dashboard'
import { loginPath } from '~/mocks/login'
import {
  deleteAccountButtonLabel,
  maskEmail,
  registeredAccount,
  settingsTitle,
} from '~/mocks/settings'

definePageMeta({
  screenClass: 'screen-settings',
})

useHead({
  title: `${settingsTitle} | ${productName}`,
})

const authenticated = useAuthCookie()
const { isPaid, markPaid } = useMembership()
const deleteDialogOpen = ref(false)
const paymentCompleteOpen = ref(false)
const maskedEmail = maskEmail(registeredAccount.email)

function openDeleteDialog() {
  deleteDialogOpen.value = true
}

async function confirmDelete() {
  // モックに削除 API は無い。ログアウトと同じく認証 Cookie を消してログインへ戻す
  authenticated.value = null
  await navigateTo(loginPath)
}

function onPay() {
  // カード情報は送らない。完了ダイアログだけ出して決済したように見せる
  paymentCompleteOpen.value = true
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
