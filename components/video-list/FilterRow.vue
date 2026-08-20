<script setup lang="ts">
import type { VideoListStatusFilter } from '~/mocks/videos'
import {
  searchPlaceholder,
  sortButtonLabel,
  statusFilterOptions,
  videoTableColumns,
} from '~/mocks/videos'

const query = defineModel<string>('query', { required: true })
const statusFilter = defineModel<VideoListStatusFilter>('statusFilter', { required: true })

const statusFilterAriaLabel = videoTableColumns.find(column => column.id === 'status')?.label

// デザインは「アップロード日時」の降順表示のみ。他の並び替えキーは仕様にない。
</script>

<template>
  <div class="filter-row">
    <label class="search">
      <AppIcon name="search" :size="18" />
      <input
        v-model="query"
        type="search"
        class="search-input"
        :placeholder="searchPlaceholder"
        :aria-label="searchPlaceholder"
      >
    </label>
    <div class="btn-outline status-filter">
      <AppIcon name="chevron-down" :size="16" />
      <select
        v-model="statusFilter"
        class="filter-select"
        :aria-label="statusFilterAriaLabel"
      >
        <option
          v-for="option in statusFilterOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <button
      type="button"
      class="btn-outline sort-button"
      :aria-label="`${sortButtonLabel}の降順`"
    >
      <AppIcon name="sort-desc" :size="16" />
      <span class="sort-button-label">{{ sortButtonLabel }}</span>
    </button>
  </div>
</template>
