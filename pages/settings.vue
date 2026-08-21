<script setup lang="ts">
// ページ名 Settings と prefix Settings* が重なり、自動解決がページ変換に乗らない
import SettingsAccountInfo from '~/components/settings/AccountInfo.vue'
import SettingsDeleteDialog from '~/components/settings/DeleteDialog.vue'
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
const deleteDialogOpen = ref(false)
const maskedEmail = maskEmail(registeredAccount.email)

function openDeleteDialog() {
  deleteDialogOpen.value = true
}

async function confirmDelete() {
  // モックに削除 API は無い。ログアウトと同じく認証 Cookie を消してログインへ戻す
  authenticated.value = null
  await navigateTo(loginPath)
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
  </div>
  <SettingsDeleteDialog
    v-model:open="deleteDialogOpen"
    @confirm="confirmDelete"
  />
</template>
