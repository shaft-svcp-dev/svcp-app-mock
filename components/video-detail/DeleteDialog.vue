<script setup lang="ts">
import {
  deleteConfirmCancelLabel,
  deleteConfirmMessage,
  deleteConfirmOkLabel,
  deleteConfirmTitle,
} from '~/mocks/video-detail'

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  confirm: []
}>()

function cancel() {
  open.value = false
}

function confirm() {
  // 閉じない。OK 後の一覧遷移はページが担う
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
      aria-labelledby="delete-confirm-title"
      aria-describedby="delete-confirm-message"
    >
      <h2
        id="delete-confirm-title"
        class="delete-dialog-title"
      >
        {{ deleteConfirmTitle }}
      </h2>
      <p
        id="delete-confirm-message"
        class="delete-dialog-message"
      >
        {{ deleteConfirmMessage }}
      </p>
      <div class="delete-dialog-actions">
        <button
          class="btn-outline delete-dialog-cancel"
          type="button"
          @click="cancel"
        >
          {{ deleteConfirmCancelLabel }}
        </button>
        <button
          class="btn delete-dialog-ok"
          type="button"
          @click="confirm"
        >
          {{ deleteConfirmOkLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
