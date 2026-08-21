<script setup lang="ts">
import {
  paymentCompleteConfirmLabel,
  paymentCompleteTitle,
} from '~/constants/settings'

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  confirm: []
}>()

function confirm() {
  // 縺薙・逕ｻ髱｢縺ｫ逡吶∪繧九◆繧√ム繧､繧｢繝ｭ繧ｰ蛛ｴ縺ｧ髢峨§繧九よ怏譁吩ｼ壼藤縺ｸ縺ｮ蛻・崛縺ｯ繝壹・繧ｸ縺梧球縺・  open.value = false
  emit('confirm')
}
</script>

<template>
  <!-- 髢峨§縺ｦ縺・ｋ縺ｨ縺阪ｂ DOM 縺ｫ谿九＠縲ヾSR 縺ｨ謾ｯ謠ｴ謚陦薙°繧峨ム繧､繧｢繝ｭ繧ｰ縺ｮ蠖ｹ蜑ｲ縺悟・縺九ｋ繧医≧縺ｫ縺吶ｋ -->
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
