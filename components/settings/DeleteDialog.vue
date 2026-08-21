<script setup lang="ts">
import {
  deleteAccountConfirmCancelLabel,
  deleteAccountConfirmMessage,
  deleteAccountConfirmOkLabel,
  deleteAccountConfirmTitle,
} from '~/constants/settings'

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  confirm: []
}>()

function cancel() {
  open.value = false
}

function confirm() {
  // 髢峨§縺ｪ縺・０K 蠕後・繝ｭ繧ｰ繧､繝ｳ驕ｷ遘ｻ縺ｯ繝壹・繧ｸ縺梧球縺・  emit('confirm')
}
</script>

<template>
  <!-- 髢峨§縺ｦ縺・ｋ縺ｨ縺阪ｂ DOM 縺ｫ谿九＠縲ヾSR 縺ｨ謾ｯ謠ｴ謚陦薙°繧峨ム繧､繧｢繝ｭ繧ｰ縺ｮ蠖ｹ蜑ｲ縺悟・縺九ｋ繧医≧縺ｫ縺吶ｋ -->
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
