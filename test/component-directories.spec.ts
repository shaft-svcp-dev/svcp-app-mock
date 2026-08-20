import { describe, expect, it } from 'vitest'

const commonComponents = import.meta.glob('../components/common/*.vue')
const dashboardComponents = import.meta.glob('../components/dashboard/*.vue')
const videoListComponents = import.meta.glob('../components/video-list/*.vue')
const videoDetailComponents = import.meta.glob('../components/video-detail/*.vue')
const rootComponents = import.meta.glob('../components/*.vue')
const layouts = import.meta.glob('../layouts/*.vue')
const videoPages = import.meta.glob('../pages/videos/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function fileNames(modules: Record<string, unknown>): string[] {
  return Object.keys(modules).map(path => path.split('/').at(-1) ?? path)
}

describe('component directories', () => {
  it('places shared components in components/common', () => {
    expect(fileNames(commonComponents).sort()).toEqual([
      'AppHeader.vue',
      'AppIcon.vue',
      'AppSidebar.vue',
    ])
    expect(fileNames(rootComponents)).toEqual([])
  })

  it('places the shared sidebar and header shell in layouts', () => {
    expect(fileNames(layouts).sort()).toEqual(['default.vue'])
  })

  it('places dashboard page components in components/dashboard', () => {
    expect(fileNames(dashboardComponents).sort()).toEqual([
      'StatCard.vue',
      'VideoRow.vue',
    ])
  })

  it('places video list page components in components/video-list', () => {
    expect(fileNames(videoListComponents).sort()).toEqual([
      'FilterRow.vue',
      'Table.vue',
    ])
  })

  it('places video detail page components in components/video-detail', () => {
    expect(fileNames(videoDetailComponents).sort()).toEqual([
      'MetaInputs.vue',
      'Player.vue',
      'SidePane.vue',
    ])
  })

  it('imports video-detail components from the dynamic detail page', () => {
    // 動的ルートでは自動解決がページ変換に乗らず本体が空になることがあるため、明示 import を契約にする
    const source = Object.entries(videoPages).find(([path]) => path.includes('[id]'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain("~/components/video-detail/Player.vue")
    expect(source).toContain("~/components/video-detail/MetaInputs.vue")
    expect(source).toContain("~/components/video-detail/SidePane.vue")
  })
})
