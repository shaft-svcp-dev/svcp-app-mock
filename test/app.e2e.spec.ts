import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('Dashboard', async () => {
  await setup({
    rootDir: '.',
  })

  it('renders the dashboard chrome, stats, and recent uploads from mock data', async () => {
    const html = await $fetch('/')

    expect(html).toContain('VideoHub')
    expect(html).toContain('ダッシュボード')
    expect(html).toContain('動画一覧')
    expect(html).toContain('アップロード')
    expect(html).toContain('設定')
    expect(html).toContain('田中 太郎')
    expect(html).toContain('プロダクトマネージャー')
    expect(html).toContain('動画をアップロード')
    expect(html).toContain('総動画数')
    expect(html).toContain('128')
    expect(html).toContain('公開済')
    expect(html).toContain('42')
    expect(html).toContain('処理中')
    expect(html).toContain('ストレージ')
    expect(html).toContain('12.4 GB')
    expect(html).toContain('最近のアップロード')
    expect(html).toContain('すべて見る')
    expect(html).toContain('製品UIデモ：ダッシュボード操作説明')
    expect(html).toContain('社内研修：アーキテクチャ解説セッション')
    expect(html).toContain('ブランドムービー：夕暮れの山並み')
    expect(html).toContain('再生時間 12:48')
    expect(html).toContain('ファイルサイズ 245.8MB')
    expect(html).not.toContain('Nuxt セットアップ完了')
  })
})
