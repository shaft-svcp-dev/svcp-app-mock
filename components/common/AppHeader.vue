<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <header class="header">
    <h1 class="header-title">
      {{ title }}
    </h1>
    <div class="header-actions">
      <slot name="actions" />
    </div>
  </header>
</template>
