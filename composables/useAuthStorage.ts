import { authStorageKey } from '~/mocks/login'

export function useAuthStorage() {
  return useClientStorage(authStorageKey)
}
