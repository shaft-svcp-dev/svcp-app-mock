<script setup lang="ts">
import { signupButtonLabel } from '~/mocks/signup'
</script>

<template>
  <div class="action-buttons">
    <button class="btn" type="submit">
      <span class="btn-label">{{ signupButtonLabel }}</span>
    </button>
  </div>
</template>
