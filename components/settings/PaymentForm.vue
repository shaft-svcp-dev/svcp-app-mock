<script setup lang="ts">
import {
  cardCvcFieldLabel,
  cardCvcPlaceholder,
  cardExpiryFieldLabel,
  cardExpiryPlaceholder,
  cardHolderFieldLabel,
  cardHolderPlaceholder,
  cardNumberFieldLabel,
  cardNumberPlaceholder,
  payButtonLabel,
  paymentSectionDescription,
  paymentSectionTitle,
} from '~/constants/settings'

const emit = defineEmits<{
  pay: []
}>()

// 見た目用の入力。決渁EPIへは送らず、支払いボタンは完亁E��イアログだけ�EぁEconst cardNumber = ref('')
const cardExpiry = ref('')
const cardCvc = ref('')
const cardHolder = ref('')

function onSubmit() {
  emit('pay')
}
</script>

<template>
  <section
    class="payment-form"
    aria-labelledby="payment-heading"
  >
    <h2
      id="payment-heading"
      class="section-title"
    >
      {{ paymentSectionTitle }}
    </h2>
    <p class="payment-description">
      {{ paymentSectionDescription }}
    </p>
    <form
      class="payment-fields"
      autocomplete="off"
      @submit.prevent="onSubmit"
    >
      <label class="payment-field">
        <span class="payment-label">{{ cardNumberFieldLabel }}</span>
        <input
          v-model="cardNumber"
          class="payment-input"
          type="text"
          inputmode="numeric"
          name="card-number"
          maxlength="19"
          :placeholder="cardNumberPlaceholder"
        >
      </label>
      <div class="payment-field-row">
        <label class="payment-field">
          <span class="payment-label">{{ cardExpiryFieldLabel }}</span>
          <input
            v-model="cardExpiry"
            class="payment-input"
            type="text"
            name="card-expiry"
            maxlength="5"
            :placeholder="cardExpiryPlaceholder"
          >
        </label>
        <label class="payment-field">
          <span class="payment-label">{{ cardCvcFieldLabel }}</span>
          <input
            v-model="cardCvc"
            class="payment-input"
            type="text"
            inputmode="numeric"
            name="card-cvc"
            maxlength="4"
            :placeholder="cardCvcPlaceholder"
          >
        </label>
      </div>
      <label class="payment-field">
        <span class="payment-label">{{ cardHolderFieldLabel }}</span>
        <input
          v-model="cardHolder"
          class="payment-input"
          type="text"
          name="card-holder"
          :placeholder="cardHolderPlaceholder"
        >
      </label>
      <button
        class="btn payment-submit"
        type="submit"
      >
        <span class="btn-label">{{ payButtonLabel }}</span>
      </button>
    </form>
  </section>
</template>
