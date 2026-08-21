<script setup lang="ts">
import {
  subtitleEmptyMessage,
  subtitleHint,
  subtitleLanguageFieldLabel,
  subtitleLanguageOptions,
  subtitleRemoveLabel,
  subtitleSectionTitle,
  subtitleUploadLabel,
} from '~/constants/video-detail'
import {
  subtitleFileAccept,
  type VideoSubtitleTrack,
} from '~/mocks/video-detail'

const tracks = defineModel<VideoSubtitleTrack[]>({ required: true })

const fileInput = ref<HTMLInputElement | null>(null)
const defaultLanguage = subtitleLanguageOptions[0]

if (!defaultLanguage) {
  throw new Error('字幕言語の選択肢が無い')
}

function openFilePicker() {
  fileInput.value?.click()
}

function isAllowedSubtitle(file: File) {
  return file.type === 'text/vtt' || /\.vtt$/i.test(file.name)
}

function revokeIfBlob(url: string) {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
  }
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const files = [...input.files ?? []]
  input.value = ''

  const next = [...tracks.value]
  for (const file of files) {
    if (!isAllowedSubtitle(file)) {
      continue
    }

    // ファイル名から言語を推測しない。誤判定より明示選択を優先する
    next.push({
      id: crypto.randomUUID(),
      filename: file.name,
      src: URL.createObjectURL(file),
      srclang: defaultLanguage.value,
      label: `${defaultLanguage.label}（${file.name}）`,
    })
  }
  tracks.value = next
}

function onLanguageChange(trackId: string, event: Event) {
  const srclang = (event.target as HTMLSelectElement).value
  const language = subtitleLanguageOptions.find(option => option.value === srclang)
  if (!language) {
    return
  }

  tracks.value = tracks.value.map((track) => {
    if (track.id !== trackId) {
      return track
    }
    return {
      ...track,
      srclang: language.value,
      label: `${language.label}（${track.filename}）`,
    }
  })
}

function removeTrack(trackId: string) {
  const target = tracks.value.find(track => track.id === trackId)
  if (target) {
    revokeIfBlob(target.src)
  }
  tracks.value = tracks.value.filter(track => track.id !== trackId)
}

function removeLabel(filename: string) {
  return `${subtitleRemoveLabel}（${filename}）`
}

onUnmounted(() => {
  for (const track of tracks.value) {
    revokeIfBlob(track.src)
  }
})
</script>

<template>
  <section
    class="section-subtitles"
    aria-labelledby="subtitle-settings-heading"
  >
    <input
      ref="fileInput"
      class="file-input-hidden"
      type="file"
      :accept="subtitleFileAccept"
      :aria-label="subtitleUploadLabel"
      multiple
      @change="onFileChange"
    >
    <h2
      id="subtitle-settings-heading"
      class="section-title"
    >
      {{ subtitleSectionTitle }}
    </h2>
    <p class="media-settings-hint">
      {{ subtitleHint }}
    </p>
    <p
      v-if="tracks.length === 0"
      class="subtitle-empty"
    >
      {{ subtitleEmptyMessage }}
    </p>
    <ul
      v-else
      class="subtitle-list"
    >
      <li
        v-for="track in tracks"
        :key="track.id"
        class="subtitle-row"
      >
        <span class="subtitle-filename">{{ track.filename }}</span>
        <select
          class="subtitle-language-select"
          :value="track.srclang"
          :aria-label="subtitleLanguageFieldLabel"
          @change="onLanguageChange(track.id, $event)"
        >
          <option
            v-for="option in subtitleLanguageOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <button
          class="btn-outline subtitle-remove"
          type="button"
          :aria-label="removeLabel(track.filename)"
          @click="removeTrack(track.id)"
        >
          <AppIcon name="trash-2" :size="16" />
        </button>
      </li>
    </ul>
    <div class="media-settings-actions">
      <button
        class="btn subtitle-upload"
        type="button"
        @click="openFilePicker"
      >
        <AppIcon name="captions" :size="16" />
        <span class="btn-label">{{ subtitleUploadLabel }}</span>
      </button>
    </div>
  </section>
</template>
