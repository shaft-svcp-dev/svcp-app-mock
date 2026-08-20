<template>
  <NuxtRouteAnnouncer />
  <!-- 複数画面で同一のサイドバー殻を共有するため、ページを default レイアウトで包む -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
