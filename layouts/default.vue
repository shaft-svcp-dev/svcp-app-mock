<script setup lang="ts">
const route = useRoute()

const screenClass = computed(() => {
  // 画面CSSが `.screen-*` を最外枠に置く前提。クラス名は各ページの definePageMeta が渡す
  const value = route.meta.screenClass
  return typeof value === 'string' ? value : ''
})
</script>

<template>
  <div :class="screenClass">
    <AppSidebar />
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>
