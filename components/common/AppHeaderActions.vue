<script setup lang="ts">
import { logoutButtonLabel, uploadButtonLabel } from '~/mocks/dashboard'

const authenticated = useAuthStorage()

async function onLogout() {
  authenticated.value = null
  await navigateTo('/login')
}
</script>

<template>
  <NuxtLink class="btn header-upload" to="/upload">
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
