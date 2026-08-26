// @ts-expect-error Vitest は Node で動く。型パッケージは依存に足していない
import { readFileSync } from 'node:fs'
// @ts-expect-error Vitest は Node で動く。型パッケージは依存に足していない
import { join } from 'node:path'
// @ts-expect-error Vitest は Node で動く。型パッケージは依存に足していない
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { publicAssetPath, resolveAppBaseURL } from '../app-base-url'
import { videoPlaybackSrc } from '../mocks/video-detail'
import { videoListItems } from '../mocks/videos'
import { prerenderRoutes } from '../prerender-routes'
import {
  dashboardPath,
  loginPath,
  passwordResetPath,
  passwordResetSentPath,
  settingsPath,
  signupPath,
  uploadPath,
  videoListPath,
} from '../routes'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

describe('GitHub Project Pages base URL', () => {
  it('normalizes the repository path to /<repo>/', () => {
    expect(resolveAppBaseURL(undefined)).toBe('/')
    expect(resolveAppBaseURL('')).toBe('/')
    expect(resolveAppBaseURL('/')).toBe('/')
    expect(resolveAppBaseURL('mock')).toBe('/mock/')
    expect(resolveAppBaseURL('/mock')).toBe('/mock/')
    expect(resolveAppBaseURL('/mock/')).toBe('/mock/')
  })

  it('prefixes public assets with the Project Pages base and leaves blob and remote URLs unchanged', () => {
    expect(publicAssetPath('/', '/images/thumb-mountain.png')).toBe(
      '/images/thumb-mountain.png',
    )
    expect(publicAssetPath('/mock/', '/images/thumb-mountain.png')).toBe(
      '/mock/images/thumb-mountain.png',
    )
    expect(publicAssetPath('/mock/', videoPlaybackSrc)).toBe(
      `/mock${videoPlaybackSrc}`,
    )

    const blobUrl = 'blob:https://example.github.io/1'
    const streamUrl = 'http://localhost:8080/hls/video-product-ui/index.m3u8'
    expect(publicAssetPath('/mock/', blobUrl)).toBe(blobUrl)
    expect(publicAssetPath('/mock/', streamUrl)).toBe(streamUrl)
  })

  it('prerenders auth screens and each video detail so GitHub Pages has HTML without crawling from the dashboard', () => {
    expect(prerenderRoutes).toEqual(expect.arrayContaining([
      dashboardPath,
      loginPath,
      signupPath,
      passwordResetPath,
      passwordResetSentPath,
      videoListPath,
      uploadPath,
      settingsPath,
      ...videoListItems.map(item => `${videoListPath}/${item.id}`),
    ]))
  })

  it('reads NUXT_APP_BASE_URL at build time and prerenders the static routes', () => {
    const nuxtConfig = readFileSync(join(repoRoot, 'nuxt.config.ts'), 'utf8')

    expect(nuxtConfig).toContain('readNuxtAppBaseURL')
    expect(nuxtConfig).toContain('resolveAppBaseURL(githubPagesBaseURL)')
    expect(nuxtConfig).toContain('prerenderRoutes')
  })

  it('deploys from main with the repository name as the Project Pages base', () => {
    const workflow = readFileSync(
      join(repoRoot, '.github/workflows/deploy-github-pages.yml'),
      'utf8',
    )

    expect(workflow).toMatch(/branches:\s*\r?\n\s*-\s*main/)
    expect(workflow).toContain('NUXT_APP_BASE_URL: /${{ github.event.repository.name }}/')
    expect(workflow).toContain('nuxt build --preset github_pages')
    expect(workflow).toContain('./.output/public')
  })
})
