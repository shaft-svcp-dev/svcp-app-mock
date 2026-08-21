<script setup lang="ts">
import {
  paymentCompleteConfirmLabel,
  paymentCompleteTitle,
} from '~/mocks/settings'

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  confirm: []
}>()

function confirm() {
  // この画面に留まるためダイアログ側で閉じる。有料会員への切替はページが担う
  open.value = false
  emit('confirm')
}
</script>

<template>
  <!-- 閉じているときも DOM に残し、SSR と支援技術からダイアログの役割が分かるようにする -->
  <div
    class="delete-dialog-overlay payment-complete-overlay"
    :hidden="!open"
  >
    <div
      class="delete-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-complete-title"
    >
      <h2
        id="payment-complete-title"
        class="delete-dialog-title"
      >
        {{ paymentCompleteTitle }}
      </h2>
      <div class="delete-dialog-actions">
        <button
          class="btn delete-dialog-ok"
          type="button"
          @click="confirm"
        >
          {{ paymentCompleteConfirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
