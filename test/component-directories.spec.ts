// @ts-expect-error Vitest は Node で動く。型パッケージは依存に足していない
import { readdirSync, readFileSync } from 'node:fs'
// @ts-expect-error Vitest は Node で動く。型パッケージは依存に足していない
import { join, relative } from 'node:path'
// @ts-expect-error Vitest は Node で動く。型パッケージは依存に足していない
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

const commonComponents = import.meta.glob('../components/common/*.vue')
const dashboardComponents = import.meta.glob('../components/dashboard/*.vue')
const videoListComponents = import.meta.glob('../components/video-list/*.vue')
const videoDetailComponents = import.meta.glob('../components/video-detail/*.vue')
const videoDetailSources = import.meta.glob('../components/video-detail/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const uploadComponents = import.meta.glob('../components/upload/*.vue')
const rootComponents = import.meta.glob('../components/*.vue')
const layouts = import.meta.glob('../layouts/*.vue')
const videoPages = import.meta.glob('../pages/videos/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const uploadPage = import.meta.glob('../pages/upload.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const loginComponents = import.meta.glob('../components/login/*.vue')
const loginPage = import.meta.glob('../pages/login.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const signupComponents = import.meta.glob('../components/signup/*.vue')
const signupPage = import.meta.glob('../pages/signup.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const passwordResetComponents = import.meta.glob('../components/password-reset/*.vue')
const passwordResetPages = import.meta.glob('../pages/password-reset/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const settingsComponents = import.meta.glob('../components/settings/*.vue')
const settingsPage = import.meta.glob('../pages/settings.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const composableSources = import.meta.glob('../composables/*.ts', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const middlewareSources = import.meta.glob('../middleware/*.ts', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const mockSources = import.meta.glob('../mocks/*.ts', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const constantSources = import.meta.glob('../constants/*.ts', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const routeSources = import.meta.glob('../routes.ts', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

// Vite glob の登録漏れを避けるため、ディスク上のソースを直接読む
function readSourceTree(relativeDir: string, suffix: string): Record<string, string> {
  const sources: Record<string, string> = {}

  function walk(current: string) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const fullPath = join(current, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      if (!entry.name.endsWith(suffix)) {
        continue
      }

      sources[relative(repoRoot, fullPath).replaceAll('\\', '/')] = readFileSync(fullPath, 'utf8')
    }
  }

  walk(join(repoRoot, relativeDir))
  return sources
}

const pageSourcesOnDisk = readSourceTree('pages', '.vue')
const componentSourcesOnDisk = readSourceTree('components', '.vue')
const layoutSourcesOnDisk = readSourceTree('layouts', '.vue')
const composableSourcesOnDisk = readSourceTree('composables', '.ts')
const middlewareSourcesOnDisk = readSourceTree('middleware', '.ts')
const constantSourcesOnDisk = readSourceTree('constants', '.ts')
const mockSourcesOnDisk = readSourceTree('mocks', '.ts')
const nuxtConfigOnDisk = readFileSync(join(repoRoot, 'nuxt.config.ts'), 'utf8')
const routesOnDisk = readFileSync(join(repoRoot, 'routes.ts'), 'utf8')

function fileNames(modules: Record<string, unknown>): string[] {
  return Object.keys(modules).map(path => path.split('/').at(-1) ?? path)
}

function expectLiveImport(source: string | undefined, modulePath: string, fromPath = 'source') {
  // コメント行に残ったパスでは自動解決されない。行頭の import だけを契約する
  expect(source, fromPath).toBeDefined()
  expect(source, fromPath).toMatch(
    new RegExp(`^import .+'${modulePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`, 'm'),
  )
}

// コメントに残ると実行されない文（import・代入・関数・useHead）
const swallowedStatement = /\/\/.*(?:import\s+(?:type\s+)?(?:\{[^}]+\}|\w[\w$]*)\s+from\s+['"`]|const\s+\w[\w$]*\s*=|let\s+\w[\w$]*\s*=|function\s+\w|await\s+\w[\w$]*|useHead\s*\(|\w[\w$]*\.value\s*=)/

function prefixedComponentDirs(config: string): { prefix: string, importPath: string }[] {
  const dirs: { prefix: string, importPath: string }[] = []
  // pathPrefix: false を終点に含めないと、共通ディレクトリが次の prefix を拾う
  const blockPattern =
    /path:\s*'~\/components\/(?<dir>[^']+)'[\s\S]*?(prefix:\s*'(?<prefix>[^']+)'|pathPrefix:\s*false)/g

  for (const match of config.matchAll(blockPattern)) {
    const dir = match.groups?.dir
    const prefix = match.groups?.prefix
    if (!dir || !prefix) {
      continue
    }

    dirs.push({ prefix, importPath: `~/components/${dir}` })
  }

  // Video と VideoList のように短い prefix が長いタグへ誤マッチしないよう、長い順に試す
  return dirs.sort((left, right) => right.prefix.length - left.prefix.length)
}

function sfcTemplate(source: string): string {
  const start = source.search(/<template(\s[^>]*)?>/)
  if (start < 0) {
    return ''
  }

  const openEnd = source.indexOf('>', start)
  // 内側の <template #slot> の閉じタグで切らない
  const close = source.lastIndexOf('</template>')
  if (openEnd < 0 || close < 0) {
    return ''
  }

  return source.slice(openEnd + 1, close)
}

function prefixedTemplateImports(source: string, dirs: { prefix: string, importPath: string }[]): string[] {
  const tags = [...sfcTemplate(source).matchAll(/<([A-Z][A-Za-z0-9]*)/g)].map(match => match[1])
  const modulePaths = new Set<string>()

  for (const tag of tags) {
    const dir = dirs.find(entry => tag.startsWith(entry.prefix) && tag.length > entry.prefix.length)
    if (!dir) {
      continue
    }

    modulePaths.add(`${dir.importPath}/${tag.slice(dir.prefix.length)}.vue`)
  }

  return [...modulePaths]
}

describe('component directories', () => {
  it('keeps live statements off // comment lines', () => {
    const sources = {
      ...pageSourcesOnDisk,
      ...componentSourcesOnDisk,
      ...layoutSourcesOnDisk,
      ...composableSourcesOnDisk,
      ...middlewareSourcesOnDisk,
      ...constantSourcesOnDisk,
      ...mockSourcesOnDisk,
      'routes.ts': routesOnDisk,
    }

    for (const [path, source] of Object.entries(sources)) {
      for (const [index, line] of source.split(/\r?\n/).entries()) {
        if (!line.trimStart().startsWith('//')) {
          continue
        }

        expect(line, `${path}:${index + 1}`).not.toMatch(swallowedStatement)
      }
    }
  })

  it('imports prefixed page components with a live import so SSR and client stay in sync', () => {
    const dirs = prefixedComponentDirs(nuxtConfigOnDisk)
    expect(dirs.map(dir => dir.prefix).sort()).toEqual([
      'Dashboard',
      'Login',
      'PasswordReset',
      'Settings',
      'Signup',
      'Upload',
      'VideoDetail',
      'VideoList',
    ])

    const sources = { ...pageSourcesOnDisk, ...layoutSourcesOnDisk }
    for (const [path, source] of Object.entries(sources)) {
      for (const modulePath of prefixedTemplateImports(source, dirs)) {
        expectLiveImport(source, modulePath, `${path} -> ${modulePath}`)
      }
    }
  })

  it('places shared components in components/common', () => {
    expect(fileNames(commonComponents).sort()).toEqual([
      'AppHeader.vue',
      'AppHeaderActions.vue',
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
      'DeleteDialog.vue',
      'MetaInputs.vue',
      'Player.vue',
      'SidePane.vue',
      'SubtitleSettings.vue',
      'ThumbnailSettings.vue',
    ])
  })

  it('places upload page components in components/upload', () => {
    expect(fileNames(uploadComponents).sort()).toEqual([
      'ConversionPipeline.vue',
      'DropZone.vue',
      'FileInfo.vue',
    ])
  })

  it('copies the existing streamUrl and exposes copy success feedback in the side pane', () => {
    const source = Object.entries(videoDetailSources).find(([path]) => path.includes('SidePane'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain('navigator.clipboard.writeText(props.video.streamUrl)')
    expect(source).toContain('copySuccessLabel')
    expect(source).toContain('copied')
  })

  it('imports video-detail components from the dynamic detail page', () => {
    const source = Object.entries(videoPages).find(([path]) => path.includes('[id]'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain('navigateTo(videoListPath)')
  })

  it('keeps video delete confirmation copy in the detail delete dialog', () => {
    const source = Object.entries(videoDetailSources).find(([path]) => path.includes('DeleteDialog'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain('deleteConfirmTitle')
    expect(source).toContain('deleteConfirmMessage')
    expect(source).toContain('deleteConfirmOkLabel')
    expect(source).toContain('deleteConfirmCancelLabel')
  })

  it('keeps thumbnail and subtitle settings as local UI state on the detail page', () => {
    const pageSource = Object.entries(videoPages).find(([path]) => path.includes('[id]'))?.[1]
    const thumbnailSource = Object.entries(videoDetailSources).find(([path]) => {
      return path.includes('ThumbnailSettings')
    })?.[1]
    const subtitleSource = Object.entries(videoDetailSources).find(([path]) => {
      return path.includes('SubtitleSettings')
    })?.[1]
    const playerSource = Object.entries(videoDetailSources).find(([path]) => {
      return path.includes('Player')
    })?.[1]

    expect(pageSource).toBeDefined()
    expect(thumbnailSource).toBeDefined()
    expect(subtitleSource).toBeDefined()
    expect(playerSource).toBeDefined()

    expect(pageSource).toContain('thumbnailSrc')
    expect(pageSource).toContain('subtitles')
    expect(thumbnailSource).toContain('URL.createObjectURL')
    expect(thumbnailSource).toContain('originalSrc')
    expect(subtitleSource).toContain('subtitleLanguageOptions')
    expect(subtitleSource).toContain('subtitleEmptyMessage')
    expect(subtitleSource).toContain('URL.createObjectURL')
    expect(playerSource).toContain('kind="subtitles"')
    expect(playerSource).toContain('<track')
  })

  it('places login page components in components/login', () => {
    expect(fileNames(loginComponents).sort()).toEqual([
      'Branding.vue',
      'FormFields.vue',
      'Submit.vue',
    ])
  })

  it('imports login components from the login page without the shared chrome layout', () => {
    const source = Object.values(loginPage)[0]
    expect(source).toBeDefined()
    expect(source).toContain('layout: false')
  })

  it('places signup page components in components/signup', () => {
    expect(fileNames(signupComponents).sort()).toEqual([
      'Branding.vue',
      'FormFields.vue',
      'Submit.vue',
      'TermsConsent.vue',
    ])
  })

  it('imports signup components from the signup page without the shared chrome layout', () => {
    const source = Object.values(signupPage)[0]
    expect(source).toBeDefined()
    expect(source).toContain('layout: false')
  })

  it('places password-reset page components in components/password-reset', () => {
    expect(fileNames(passwordResetComponents).sort()).toEqual([
      'Branding.vue',
      'FormFields.vue',
      'Submit.vue',
    ])
  })

  it('imports password-reset components from the form page without the shared chrome layout', () => {
    const source = Object.entries(passwordResetPages).find(([path]) => path.endsWith('index.vue'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain('layout: false')
    expect(source).toContain('navigateTo(passwordResetSentPath)')
  })

  it('keeps the password-reset sent page without the shared chrome layout', () => {
    const source = Object.entries(passwordResetPages).find(([path]) => path.endsWith('sent.vue'))?.[1]
    expect(source).toBeDefined()
    expect(source).toContain('layout: false')
    expect(source).toContain('passwordResetSentTitle')
    expect(source).toContain('loginScreenLinkLabel')
  })

  it('places settings page components in components/settings', () => {
    expect(fileNames(settingsComponents).sort()).toEqual([
      'AccountInfo.vue',
      'DeleteDialog.vue',
      'MembershipStatus.vue',
      'PaymentCompleteDialog.vue',
      'PaymentForm.vue',
    ])
  })

  it('imports settings components from the settings page', () => {
    const source = Object.values(settingsPage)[0]
    expect(source).toBeDefined()
    expect(source).toContain('registeredAccount')
    expect(source).toContain('maskEmail')
    expect(source).toContain('authenticated.value = null')
    expect(source).toContain('navigateTo(loginPath)')
    expect(source).toContain('markPaid')
    expect(source).toContain('paymentCompleteOpen')
  })

  it('gates video delete and multi-file upload on paid membership', () => {
    const detailSource = Object.entries(videoPages).find(([path]) => path.includes('[id]'))?.[1]
    const uploadSource = Object.values(uploadPage)[0]

    expect(detailSource).toBeDefined()
    expect(detailSource).toContain('isPaid')
    expect(detailSource).toContain('v-if="isPaid"')
    expect(detailSource).toContain('markDeleted')

    expect(uploadSource).toBeDefined()
    expect(uploadSource).toContain('isPaid')
    expect(uploadSource).toContain('limitSelectedFiles')
    expect(uploadSource).toContain(':multiple="isPaid"')
  })

  it('stores auth, membership, and deleted video ids in localStorage instead of cookies', () => {
    expect(fileNames(composableSources).sort()).toEqual([
      'useAuthStorage.ts',
      'useClientStorage.ts',
      'useDeletedVideoIds.ts',
      'useMembership.ts',
    ])

    const authSource = Object.entries(composableSources).find(([path]) => {
      return path.endsWith('useAuthStorage.ts')
    })?.[1]
    const membershipSource = Object.entries(composableSources).find(([path]) => {
      return path.endsWith('useMembership.ts')
    })?.[1]
    const deletedIdsSource = Object.entries(composableSources).find(([path]) => {
      return path.endsWith('useDeletedVideoIds.ts')
    })?.[1]
    const clientStorageSource = Object.entries(composableSources).find(([path]) => {
      return path.endsWith('useClientStorage.ts')
    })?.[1]
    const middlewareSource = Object.entries(middlewareSources).find(([path]) => {
      return path.endsWith('auth.global.ts')
    })?.[1]
    const loginSource = Object.values(loginPage)[0]
    const signupSource = Object.values(signupPage)[0]

    expect(clientStorageSource).toBeDefined()
    expect(clientStorageSource).toContain('localStorage.getItem')
    expect(clientStorageSource).toContain('localStorage.setItem')
    expect(clientStorageSource).toContain('localStorage.removeItem')
    expect(clientStorageSource).not.toContain('useCookie')

    expect(authSource).toBeDefined()
    expect(authSource).toContain('useClientStorage')
    expect(authSource).toContain('authStorageKey')
    expect(authSource).not.toContain('useCookie')

    expect(membershipSource).toBeDefined()
    expect(membershipSource).toContain('useClientStorage')
    expect(membershipSource).toContain('membershipStorageKey')
    expect(membershipSource).not.toContain('useCookie')

    expect(deletedIdsSource).toBeDefined()
    expect(deletedIdsSource).toContain('useClientStorage')
    expect(deletedIdsSource).toContain('deletedVideoIdsStorageKey')
    expect(deletedIdsSource).not.toContain('useCookie')

    expect(middlewareSource).toBeDefined()
    expect(middlewareSource).toContain('import.meta.server')
    expect(middlewareSource).toContain('useAuthStorage')
    expect(middlewareSource).toContain('isAuthenticated')
    expect(middlewareSource).not.toContain('useCookie')
    expect(middlewareSource).not.toContain('useAuthCookie')

    expect(loginSource).toContain('useAuthStorage')
    expect(loginSource).toContain('authStorageValue')
    expect(signupSource).toContain('useAuthStorage')
    expect(signupSource).toContain('authStorageValue')
  })

  it('keeps screen titles in constants/, routes in routes.ts, and only data in mocks/', () => {
    expect(fileNames(constantSources).sort()).toEqual([
      'dashboard.ts',
      'login.ts',
      'password-reset.ts',
      'settings.ts',
      'signup.ts',
      'upload.ts',
      'video-detail.ts',
      'videos.ts',
    ])

    const constantsJoined = Object.values(constantSources).join('\n')
    expect(constantsJoined).toContain('export const loginTitle')
    expect(constantsJoined).toContain('export const signupTitle')
    expect(constantsJoined).toContain('export const passwordResetTitle')
    expect(constantsJoined).toContain('export const settingsTitle')
    expect(constantsJoined).toContain('export const dashboardTitle')
    expect(constantsJoined).toContain('export const videoListTitle')
    expect(constantsJoined).toContain('export const videoDetailTitle')

    const routeJoined = Object.values(routeSources).join('\n')
    expect(routeJoined).toContain('export const loginPath')
    expect(routeJoined).toContain('export const signupPath')
    expect(routeJoined).toContain('export const passwordResetPath')
    expect(routeJoined).toContain('export const passwordResetSentPath')
    expect(routeJoined).toContain('export const settingsPath')
    expect(routeJoined).toContain('export const videoListPath')
    expect(routeJoined).toContain('export const dashboardPath')
    expect(routeJoined).toContain('export const uploadPath')

    const constantExportName = /export const \w+(Title|Label|Placeholder|Tagline|Message|Hint|Note|Prompt|Description)\b/
    const pathExportName = /export const \w+Path\b/
    for (const [path, source] of Object.entries(mockSources)) {
      expect(source, path).not.toMatch(constantExportName)
      expect(source, path).not.toMatch(pathExportName)
    }
  })
})
