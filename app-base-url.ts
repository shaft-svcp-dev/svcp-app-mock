/**
 * GitHub Project Pages の公開 URL は https://<user>.github.io/<repo>/ 。
 * Vue Router と public 配下の参照を同じ /<repo>/ に揃える。
 */
export function resolveAppBaseURL(value: string | undefined): string {
  if (!value) {
    return '/'
  }

  const trimmed = value.replace(/^\/+|\/+$/g, '')
  if (!trimmed) {
    return '/'
  }

  return `/${trimmed}/`
}

export function publicAssetPath(baseURL: string, path: string): string {
  // blob や HLS などスキーム付き URL は public 配下ではない
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) {
    return path
  }

  const base = resolveAppBaseURL(baseURL)
  const relative = path.replace(/^\/+/, '')
  if (!relative) {
    return base
  }

  return `${base}${relative}`
}

export function readNuxtAppBaseURL(): string | undefined {
  // nuxt.config は Node で評価される。@types/node は依存に足していない
  const env = (globalThis as { process?: { env?: { NUXT_APP_BASE_URL?: string } } }).process?.env
  return env?.NUXT_APP_BASE_URL
}

