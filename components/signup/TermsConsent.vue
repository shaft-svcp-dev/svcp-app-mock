<script setup lang="ts">
import { termsConsentLabel } from '~/constants/signup'

const agreed = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="terms-consent">
    <input
      v-model="agreed"
      class="terms-checkbox"
      type="checkbox"
      name="terms"
      required
    >
    <span class="checkbox-box" aria-hidden="true">
      <AppIcon name="check" :size="13" />
    </span>
    <span class="checkbox-label">{{ termsConsentLabel }}</span>
  </label>
</template>
