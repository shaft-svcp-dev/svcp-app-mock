<script setup lang="ts">
// ページ名 Upload と prefix Upload* が重なり、自動解決がページ変換に乗らない
import UploadConversionPipeline from '~/components/upload/ConversionPipeline.vue'
import UploadDropZone from '~/components/upload/DropZone.vue'
import UploadFileInfo from '~/components/upload/FileInfo.vue'
import { productName, uploadButtonLabel } from '~/constants/dashboard'
import {
  conversionProgressCompleteLabel,
  conversionProgressLabel,
  conversionProgressLabelByStep,
  freeUploadLimitNote,
  paidUploadMultipleNote,
} from '~/constants/upload'
import {
  buildConversionSteps,
  conversionProgressTickMs,
  formatFileSize,
  limitSelectedFiles,
  pipelineTotalDurationMs,
  progressPercentFromElapsed,
  type UploadingFile,
} from '~/mocks/upload'

definePageMeta({
  screenClass: 'screen-upload',
})

// Figma header-title は 9em。既存の「動画をアップロード」と一致するため複製しない
useHead({
  title: `${uploadButtonLabel} | ${productName}`,
})

const { isPaid } = useMembership()
const selectedFiles = ref<File[]>([])
const pipelineStarted = ref(false)
const progressPercent = ref(0)
let pipelineTimer: ReturnType<typeof setInterval> | undefined

const pipelineSteps = computed(() => {
  return buildConversionSteps(progressPercent.value, pipelineStarted.value)
})

const progressLabel = computed(() => {
  const activeStep = pipelineSteps.value.find(step => step.status === 'active')
  if (activeStep) {
    return conversionProgressLabelByStep[activeStep.id] ?? conversionProgressLabel
  }

  if (pipelineSteps.value.every(step => step.status === 'complete')) {
    return conversionProgressCompleteLabel
  }

  return conversionProgressLabel
})

const displayFiles = computed<UploadingFile[]>(() => {
  return selectedFiles.value.map(file => ({
    filename: file.name,
    metadata: formatFileSize(file.size),
  }))
})

function clearPipelineTimer() {
  if (pipelineTimer === undefined) {
    return
  }

  clearInterval(pipelineTimer)
  pipelineTimer = undefined
}

function startMockPipeline() {
  // 実アップロード・変換はせず、経過時間で3ステップが順に完了して見えるようにする
  clearPipelineTimer()
  pipelineStarted.value = true
  progressPercent.value = 0
  const startedAt = Date.now()
  const totalMs = pipelineTotalDurationMs()

  pipelineTimer = setInterval(() => {
    progressPercent.value = progressPercentFromElapsed(Date.now() - startedAt, totalMs)
    if (progressPercent.value >= 100) {
      clearPipelineTimer()
    }
  }, conversionProgressTickMs)
}

function onSelectFiles(files: File[]) {
  const nextFiles = limitSelectedFiles(files, isPaid.value)
  if (nextFiles.length === 0) {
    return
  }

  selectedFiles.value = nextFiles
  startMockPipeline()
}

onUnmounted(clearPipelineTimer)
</script>

<template>
  <AppHeader :title="uploadButtonLabel" />
  <div class="page-body">
    <div class="upload-card">
      <p class="upload-limit-note">
        {{ isPaid ? paidUploadMultipleNote : freeUploadLimitNote }}
      </p>
      <UploadDropZone
        :multiple="isPaid"
        @select="onSelectFiles"
      />
      <UploadConversionPipeline
        :steps="pipelineSteps"
        :progress-percent="progressPercent"
        :progress-label="progressLabel"
      />
      <UploadFileInfo
        v-for="(file, index) in displayFiles"
        :key="`${file.filename}-${index}`"
        :file="file"
      />
    </div>
  </div>
</template>
