import { publicAssetPath } from '~/app-base-url'

export function usePublicAssetPath() {
  const { app } = useRuntimeConfig()

  return (path: string) => publicAssetPath(app.baseURL, path)
}
