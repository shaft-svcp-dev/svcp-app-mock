<script setup lang="ts">
import {
  emailFieldLabel,
  emailPlaceholder,
  passwordFieldLabel,
  passwordPlaceholder,
} from '~/mocks/login'

const email = defineModel<string>('email', { required: true })
const password = defineModel<string>('password', { required: true })
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
    <label class="field-password">
      <span class="label">{{ passwordFieldLabel }}</span>
      <input
        v-model="password"
        class="input"
        type="password"
        name="password"
        autocomplete="current-password"
        :placeholder="passwordPlaceholder"
        required
      >
    </label>
  </div>
</template>
