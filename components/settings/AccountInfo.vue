<script setup lang="ts">
// 項目名は登録・ログインと同じ文言を使う。設定画面用に複製しない
import { emailFieldLabel } from '~/mocks/login'
import { accountSectionTitle } from '~/mocks/settings'
import {
  companyFieldLabel,
  fullNameFieldLabel,
} from '~/mocks/signup'

defineProps<{
  companyName: string
  fullName: string
  email: string
}>()
</script>

<template>
  <section
    class="account-info"
    aria-labelledby="account-info-heading"
  >
    <h2
      id="account-info-heading"
      class="section-title"
    >
      {{ accountSectionTitle }}
    </h2>
    <div class="account-rows">
      <div class="account-row">
        <span class="account-label">{{ companyFieldLabel }}</span>
        <span class="account-value">{{ companyName }}</span>
      </div>
      <div class="account-row">
        <span class="account-label">{{ fullNameFieldLabel }}</span>
        <span class="account-value">{{ fullName }}</span>
      </div>
      <div class="account-row">
        <span class="account-label">{{ emailFieldLabel }}</span>
        <span class="account-value">{{ email }}</span>
      </div>
    </div>
  </section>
</template>
