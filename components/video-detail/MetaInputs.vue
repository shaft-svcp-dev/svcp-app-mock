<script setup lang="ts">
import {
  descriptionFieldLabel,
  titleFieldLabel,
} from '~/constants/video-detail'

const title = defineModel<string>('title', { required: true })
const description = defineModel<string>('description', { required: true })
</script>

<template>
  <div class="meta-inputs-card">
    <label class="field-title">
      <span class="field-label">{{ titleFieldLabel }}</span>
      <input
        v-model="title"
        class="field-input"
        type="text"
        :aria-label="titleFieldLabel"
      >
    </label>
    <label class="field-description">
      <span class="field-label">{{ descriptionFieldLabel }}</span>
      <textarea
        v-model="description"
        class="field-textarea"
        :aria-label="descriptionFieldLabel"
      />
    </label>
  </div>
</template>
