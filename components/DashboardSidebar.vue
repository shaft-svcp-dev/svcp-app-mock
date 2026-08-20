<script setup lang="ts">
import {
  dashboardNavItems,
  dashboardUser,
  productName,
} from '~/mocks/dashboard'

const route = useRoute()

function isActiveNav(to: string): boolean {
  return route.path === to
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
      <nav class="nav-list" aria-label="メインナビゲーション">
        <NuxtLink
          v-for="item in dashboardNavItems"
          :key="item.id"
          :to="item.to"
          class="nav-item"
          :class="{ 'nav-item-active': isActiveNav(item.to) }"
          :aria-current="isActiveNav(item.to) ? 'page' : undefined"
        >
          <AppIcon :name="item.icon" :size="20" />
          <span class="nav-label">{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </div>
    <div class="sidebar-footer">
      <img
        class="avatar"
        :src="dashboardUser.avatarSrc"
        :alt="dashboardUser.avatarAlt"
      >
      <div class="user-meta">
        <span class="user-name">{{ dashboardUser.name }}</span>
        <span class="user-role">{{ dashboardUser.role }}</span>
      </div>
    </div>
  </aside>
</template>
