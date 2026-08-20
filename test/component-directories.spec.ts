import { describe, expect, it } from 'vitest'

const commonComponents = import.meta.glob('../components/common/*.vue')
const dashboardComponents = import.meta.glob('../components/dashboard/*.vue')
const videoListComponents = import.meta.glob('../components/video-list/*.vue')
const rootComponents = import.meta.glob('../components/*.vue')

function fileNames(modules: Record<string, unknown>): string[] {
  return Object.keys(modules).map(path => path.split('/').at(-1) ?? path)
}

describe('component directories', () => {
  it('places shared components in components/common', () => {
    expect(fileNames(commonComponents).sort()).toEqual(['AppIcon.vue', 'AppSidebar.vue'])
    expect(fileNames(rootComponents)).toEqual([])
  })

  it('places dashboard page components in components/dashboard', () => {
    expect(fileNames(dashboardComponents).sort()).toEqual([
      'Header.vue',
      'StatCard.vue',
      'VideoRow.vue',
    ])
  })

  it('places video list page components in components/video-list', () => {
    expect(fileNames(videoListComponents).sort()).toEqual([
      'FilterRow.vue',
      'Header.vue',
      'Table.vue',
    ])
  })
})
