<script setup lang="ts">
import type { DashboardStat } from '~/mocks/dashboard'

defineProps<{
  stat: DashboardStat
}>()
</script>

<template>
  <article class="stat-card">
    <div class="stat-card-content">
      <span class="stat-label">{{ stat.label }}</span>
      <span class="stat-value">{{ stat.value }}</span>
    </div>
    <div class="icon-container" :class="`icon-container-${stat.tone}`">
      <AppIcon :name="stat.icon" :size="24" />
    </div>
  </article>
</template>
