<script setup lang="ts">
import { emailFieldLabel, emailPlaceholder } from '~/constants/password-reset'

const email = defineModel<string>('email', { required: true })
</script>

<template>
  <div class="form-fields">
    <label class="field-email">
      <span class="label">{{ emailFieldLabel }}</span>
      <input
        v-model="email"
        class="input"
        type="email"
        name="email"
        autocomplete="username"
        :placeholder="emailPlaceholder"
        required
      >
    </label>
  </div>
</template>
