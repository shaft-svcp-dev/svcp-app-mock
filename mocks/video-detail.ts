export interface VideoSubtitleTrack {
  id: string
  filename: string
  src: string
  srclang: string
  label: string
}

// public/video に置いたモック動画。ファイル名の日本語と①を維持する
export const videoPlaybackSrc = '/video/テスト用動画①.mp4'
export const thumbnailFileAccept = 'image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp'
export const subtitleFileAccept = '.vtt,text/vtt'
