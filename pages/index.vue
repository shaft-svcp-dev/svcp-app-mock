<script setup lang="ts">
import {
  buildDashboardStats,
  dashboardTitle,
  recentSectionTitle,
  recentUploads,
  viewAllLabel,
} from '~/mocks/dashboard'
import { excludeDeletedVideos, videoListItems } from '~/mocks/videos'

definePageMeta({
  screenClass: 'screen-dashboard',
})

const { deletedIds } = useDeletedVideoIds()
const visibleVideos = computed(() => excludeDeletedVideos(videoListItems, deletedIds.value))
const visibleRecentUploads = computed(() => excludeDeletedVideos(recentUploads, deletedIds.value))
const dashboardStats = computed(() => buildDashboardStats(visibleVideos.value))
</script>

<template>
  <AppHeader :title="dashboardTitle">
    <template #actions>
      <AppHeaderActions />
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
          v-for="upload in visibleRecentUploads"
          :key="upload.id"
          :upload="upload"
        />
      </div>
    </section>
  </div>
</template>
