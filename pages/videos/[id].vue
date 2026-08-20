<script setup lang="ts">
// 動的ルートでは prefixed コンポーネントの自動解決がページ変換に乗らず、ヘッダーだけ出て本体が空になることがある
import VideoDetailMetaInputs from '~/components/video-detail/MetaInputs.vue'
import VideoDetailPlayer from '~/components/video-detail/Player.vue'
import VideoDetailSidePane from '~/components/video-detail/SidePane.vue'
import { productName } from '~/mocks/dashboard'
import {
  cancelButtonLabel,
  saveButtonLabel,
  videoDetailTitle,
} from '~/mocks/video-detail'
import { videoListItems } from '~/mocks/videos'

definePageMeta({
  screenClass: 'screen-video-detail',
})

const route = useRoute()
const video = videoListItems.find(item => item.id === route.params.id)

if (!video) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
  })
}

useHead({
  title: `${videoDetailTitle} | ${productName}`,
})

const title = ref(video.title)
// Figma の説明欄には2行分のテキスト枠があるが、文言は CSS / 既存モックに無い
const description = ref('')
</script>

<template>
  <AppHeader :title="videoDetailTitle">
    <template #actions>
      <NuxtLink class="btn-outline header-cancel" to="/videos">
        <span class="btn-label">{{ cancelButtonLabel }}</span>
      </NuxtLink>
      <button class="btn header-save" type="button">
        <span class="btn-label">{{ saveButtonLabel }}</span>
      </button>
    </template>
  </AppHeader>
  <div class="page-body">
    <div class="left-pane">
      <VideoDetailPlayer :video="video" />
      <VideoDetailMetaInputs
        v-model:title="title"
        v-model:description="description"
      />
    </div>
    <VideoDetailSidePane :video="video" />
  </div>
</template>
