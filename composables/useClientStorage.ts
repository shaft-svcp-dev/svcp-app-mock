export function useClientStorage(key: string) {
  const value = useState<string | null>(`client-storage:${key}`, () => null)
  const isBound = useState<boolean>(`client-storage-bound:${key}`, () => false)

  // ルートミドルウェアは mount より先に走る。同じキーでは読込と watch を一度だけにする
  if (import.meta.client && !isBound.value) {
    isBound.value = true
    value.value = localStorage.getItem(key)
    watch(value, (next) => {
      if (next == null) {
        localStorage.removeItem(key)
        return
      }

      localStorage.setItem(key, next)
    })
  }

  return value
}
