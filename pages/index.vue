<script setup lang="ts">
import {
  dashboardStats,
  dashboardTitle,
  recentSectionTitle,
  recentUploads,
  uploadButtonLabel,
  viewAllLabel,
} from '~/mocks/dashboard'

definePageMeta({
  screenClass: 'screen-dashboard',
})
</script>

<template>
  <AppHeader :title="dashboardTitle">
    <template #actions>
      <NuxtLink class="btn" to="/upload">
        <AppIcon name="plus" :size="16" />
        <span class="btn-label">{{ uploadButtonLabel }}</span>
      </NuxtLink>
    </template>
  </AppHeader>
  <div class="page-body">
    <div class="stats-row">
      <DashboardStatCard
        v-for="stat in dashboardStats"
        :key="stat.id"
        :stat="stat"
      />
    </div>
    <section class="recent-section" aria-labelledby="recent-uploads-heading">
      <div class="sec-header">
        <h2 id="recent-uploads-heading" class="sec-title">
          {{ recentSectionTitle }}
        </h2>
        <NuxtLink class="view-all-link" to="/videos">
          {{ viewAllLabel }}
        </NuxtLink>
      </div>
      <div class="uploads-list">
        <DashboardVideoRow
          v-for="upload in recentUploads"
          :key="upload.id"
          :upload="upload"
        />
      </div>
    </section>
  </div>
</template>
