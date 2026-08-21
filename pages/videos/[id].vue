<script setup lang="ts">
// 動的ルートでは prefixed コンポーネントの自動解決がページ変換に乗らず、ヘッダーだけ出て本体が空になることがある
import VideoDetailDeleteDialog from '~/components/video-detail/DeleteDialog.vue'
import VideoDetailMetaInputs from '~/components/video-detail/MetaInputs.vue'
import VideoDetailPlayer from '~/components/video-detail/Player.vue'
import VideoDetailSidePane from '~/components/video-detail/SidePane.vue'
import VideoDetailSubtitleSettings from '~/components/video-detail/SubtitleSettings.vue'
import VideoDetailThumbnailSettings from '~/components/video-detail/ThumbnailSettings.vue'
import { productName } from '~/constants/dashboard'
import {
  cancelButtonLabel,
  deleteButtonLabel,
  saveButtonLabel,
  videoDetailTitle,
} from '~/constants/video-detail'
import type { VideoSubtitleTrack } from '~/mocks/video-detail'
import { videoListItems } from '~/mocks/videos'
import { videoListPath } from '~/routes'

definePageMeta({
  screenClass: 'screen-video-detail',
})

const route = useRoute()
const { isPaid } = useMembership()
const { deletedIds, markDeleted } = useDeletedVideoIds()
const video = videoListItems.find(item => item.id === route.params.id)

// モック配列は消さない。削除済み id が localStorage にある動画は存在しないものとして扱う
if (!video || deletedIds.value.includes(video.id)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
  })
}

const videoId = video.id

useHead({
  title: `${videoDetailTitle} | ${productName}`,
})

const title = ref(video.title)
const description = ref(video.description)
// タイトル・説明と同じく、公開・サムネイル・字幕は詳細画面のローカル UI 状態。モック配列は更新しない
const status = ref(video.status)
const thumbnailSrc = ref(video.thumbnailSrc)
const subtitles = ref<VideoSubtitleTrack[]>([])
const deleteDialogOpen = ref(false)

function openDeleteDialog() {
  deleteDialogOpen.value = true
}

async function confirmDelete() {
  markDeleted(videoId)
  await navigateTo(videoListPath)
}
</script>

<template>
  <AppHeader :title="videoDetailTitle">
    <template #actions>
      <NuxtLink class="btn-outline header-cancel" :to="videoListPath">
        <span class="btn-label">{{ cancelButtonLabel }}</span>
      </NuxtLink>
      <button class="btn header-save" type="button">
        <span class="btn-label">{{ saveButtonLabel }}</span>
      </button>
      <button
        v-if="isPaid"
        class="btn-outline header-delete"
        type="button"
        @click="openDeleteDialog"
      >
        <span class="btn-label">{{ deleteButtonLabel }}</span>
      </button>
    </template>
  </AppHeader>
  <div class="page-body">
    <div class="left-pane">
      <VideoDetailPlayer
        :video="video"
        :poster-src="thumbnailSrc"
        :subtitles="subtitles"
      />
      <VideoDetailMetaInputs
        v-model:title="title"
        v-model:description="description"
      />
      <div class="media-settings-row">
        <VideoDetailThumbnailSettings
          v-model:src="thumbnailSrc"
          :original-src="video.thumbnailSrc"
          :alt="video.thumbnailAlt"
        />
        <VideoDetailSubtitleSettings v-model="subtitles" />
      </div>
    </div>
    <VideoDetailSidePane
      :video="video"
      v-model:status="status"
    />
  </div>
  <VideoDetailDeleteDialog
    v-if="isPaid"
    v-model:open="deleteDialogOpen"
    @confirm="confirmDelete"
  />
</template>
