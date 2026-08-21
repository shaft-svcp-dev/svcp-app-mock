<script setup lang="ts">
import {
  dashboardNavLabel,
  mainNavAriaLabel,
  productName,
} from '~/constants/dashboard'
import {
  dashboardNavItems,
  dashboardUser,
} from '~/mocks/dashboard'
import { dashboardNavPath, dashboardPath } from '~/routes'

const route = useRoute()

function navPath(id: string): string {
  const path = dashboardNavPath[id]
  if (!path) {
    throw new Error(`ナビ id ${id} のパスが無い`)
  }
  return path
}

function isActiveNav(to: string): boolean {
  // 動画詳細 `/videos/:id` でも一覧ナビを選択状態にする（Figma の video-list active）
  if (to === dashboardPath) {
    return route.path === dashboardPath
  }

  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-top">
      <div class="logo">
        <div class="logo-mark">
          <AppIcon name="play-circle" :size="19" />
        </div>
        <span class="logo-text">{{ productName }}</span>
      </div>
      <nav class="nav-list" :aria-label="mainNavAriaLabel">
        <NuxtLink
          v-for="item in dashboardNavItems"
          :key="item.id"
          :to="navPath(item.id)"
          class="nav-item"
          :class="{ 'nav-item-active': isActiveNav(navPath(item.id)) }"
          :aria-current="isActiveNav(navPath(item.id)) ? 'page' : undefined"
        >
          <AppIcon :name="item.icon" :size="20" />
          <span class="nav-label">{{ dashboardNavLabel[item.id] }}</span>
        </NuxtLink>
      </nav>
    </div>
    <div class="sidebar-footer">
      <NuxtLink
        class="avatar-link"
        :to="navPath('settings')"
      >
        <img
          class="avatar"
          :src="dashboardUser.avatarSrc"
          :alt="dashboardUser.avatarAlt"
        >
      </NuxtLink>
      <div class="user-meta">
        <span class="user-name">{{ dashboardUser.name }}</span>
        <span class="user-role">{{ dashboardUser.role }}</span>
      </div>
    </div>
  </aside>
</template>
