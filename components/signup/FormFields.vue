<script setup lang="ts">
import {
  companyFieldLabel,
  companyPlaceholder,
  emailFieldLabel,
  emailPlaceholder,
  fullNameFieldLabel,
  fullNamePlaceholder,
  passwordConfirmFieldLabel,
  passwordFieldLabel,
  passwordMismatchMessage,
  passwordPlaceholder,
  requiredFieldLabel,
} from '~/constants/signup'

const companyName = defineModel<string>('companyName', { required: true })
const fullName = defineModel<string>('fullName', { required: true })
const email = defineModel<string>('email', { required: true })
const password = defineModel<string>('password', { required: true })
const passwordConfirm = defineModel<string>('passwordConfirm', { required: true })

const passwordConfirmInput = ref<HTMLInputElement | null>(null)

watch([password, passwordConfirm], () => {
  // 確認欁E��あるので、見た目のなぁE��イチE��ブ検証で一致だけ見る
  passwordConfirmInput.value?.setCustomValidity(
    password.value === passwordConfirm.value ? '' : passwordMismatchMessage,
  )
})
</script>

<template>
  <div class="form-fields">
    <label class="field-company">
      <span class="field-label-row">
        <span class="label">{{ companyFieldLabel }}</span>
        <span class="required">{{ requiredFieldLabel }}</span>
      </span>
      <span class="input-box">
        <span class="input-icon">
          <AppIcon name="briefcase" :size="14" />
        </span>
        <input
          v-model="companyName"
          class="input"
          type="text"
          name="company"
          autocomplete="organization"
          :placeholder="companyPlaceholder"
          required
        >
      </span>
    </label>
    <label class="field-full-name">
      <span class="field-label-row">
        <span class="label">{{ fullNameFieldLabel }}</span>
        <span class="required">{{ requiredFieldLabel }}</span>
      </span>
      <span class="input-box">
        <span class="input-icon">
          <AppIcon name="user" :size="14" />
        </span>
        <input
          v-model="fullName"
          class="input"
          type="text"
          name="name"
          autocomplete="name"
          :placeholder="fullNamePlaceholder"
          required
        >
      </span>
    </label>
    <label class="field-email">
      <span class="field-label-row">
        <span class="label">{{ emailFieldLabel }}</span>
        <span class="required">{{ requiredFieldLabel }}</span>
      </span>
      <span class="input-box">
        <span class="input-icon">
          <AppIcon name="mail" :size="14" />
        </span>
        <input
          v-model="email"
          class="input"
          type="email"
          name="email"
          autocomplete="email"
          :placeholder="emailPlaceholder"
          required
        >
      </span>
    </label>
    <label class="field-password">
      <span class="field-label-row">
        <span class="label">{{ passwordFieldLabel }}</span>
        <span class="required">{{ requiredFieldLabel }}</span>
      </span>
      <span class="input-box">
        <span class="input-icon">
          <AppIcon name="lock" :size="14" />
        </span>
        <input
          v-model="password"
          class="input"
          type="password"
          name="password"
          autocomplete="new-password"
          :placeholder="passwordPlaceholder"
          required
        >
      </span>
    </label>
    <label class="field-password-confirm">
      <span class="field-label-row">
        <span class="label">{{ passwordConfirmFieldLabel }}</span>
        <span class="required">{{ requiredFieldLabel }}</span>
      </span>
      <span class="input-box">
        <span class="input-icon">
          <AppIcon name="lock" :size="14" />
        </span>
        <input
          ref="passwordConfirmInput"
          v-model="passwordConfirm"
          class="input"
          type="password"
          name="passwordConfirm"
          autocomplete="new-password"
          :placeholder="passwordPlaceholder"
          required
        >
      </span>
    </label>
  </div>
</template>
