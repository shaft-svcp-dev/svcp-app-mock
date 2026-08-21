<script setup lang="ts">
import {
  deleteAccountConfirmCancelLabel,
  deleteAccountConfirmMessage,
  deleteAccountConfirmOkLabel,
  deleteAccountConfirmTitle,
} from '~/mocks/settings'

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  confirm: []
}>()

function cancel() {
  open.value = false
}

function confirm() {
  // 閉じない。OK 後のログイン遷移はページが担う
  emit('confirm')
}
</script>

<template>
  <!-- 閉じているときも DOM に残し、SSR と支援技術からダイアログの役割が分かるようにする -->
  <div
    class="delete-dialog-overlay"
    :hidden="!open"
  >
    <div
      class="delete-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-delete-confirm-title"
      aria-describedby="settings-delete-confirm-message"
    >
      <h2
        id="settings-delete-confirm-title"
        class="delete-dialog-title"
      >
        {{ deleteAccountConfirmTitle }}
      </h2>
      <p
        id="settings-delete-confirm-message"
        class="delete-dialog-message"
      >
        {{ deleteAccountConfirmMessage }}
      </p>
      <div class="delete-dialog-actions">
        <button
          class="btn-outline delete-dialog-cancel"
          type="button"
          @click="cancel"
        >
          {{ deleteAccountConfirmCancelLabel }}
        </button>
        <button
          class="btn delete-dialog-ok"
          type="button"
          @click="confirm"
        >
          {{ deleteAccountConfirmOkLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
