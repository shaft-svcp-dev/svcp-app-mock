<script setup lang="ts">
import { logoutButtonLabel, uploadButtonLabel } from '~/constants/dashboard'
import { loginPath, uploadPath } from '~/routes'

const authenticated = useAuthStorage()

async function onLogout() {
  authenticated.value = null
  await navigateTo(loginPath)
}
</script>

<template>
  <NuxtLink class="btn header-upload" :to="uploadPath">
    <AppIcon name="plus" :size="16" />
    <span class="btn-label">{{ uploadButtonLabel }}</span>
  </NuxtLink>
  <button
    class="btn-outline header-logout"
    type="button"
    @click="onLogout"
  >
    {{ logoutButtonLabel }}
  </button>
</template>
