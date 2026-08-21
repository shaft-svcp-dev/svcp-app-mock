---
name: splitting-page-components
description: >-
  画面ごとのディレクトリにページ専用コンポーネントを分け、共通部品は components/common に置く。
  新しい画面（アップロード、設定など）の実装、コンポーネント分割、FilterRow のようなブロック抽出、
  Nuxt の prefix 設定、layouts（複数画面で同じシェルを共有する場合のみ）、モックと CSS の配置を行うときに使用する。
---

# ページ単位でコンポーネントを分ける

可読性・コメントは `writing-readable-code` に従う。このスキルは分割と配置だけを扱う。

基準は `components/video-list/` と `pages/videos.vue`。ダッシュボードは繰り返しカードの抽出例として使う。

## 配置

| 種類 | 場所 | ファイル名 | テンプレート上の名前 |
|------|------|------------|----------------------|
| 共通 | `components/common/` | `App*.vue` | `<AppIcon>`（`pathPrefix: false`） |
| ページ専用 | `components/<画面>/` | 接頭辞なし（`Header.vue`） | `<VideoListHeader>`（`nuxt.config` の `prefix`） |
| ページ | `pages/` | ルートに合わせる（`videos.vue` → `/videos`） | — |
| レイアウト | `layouts/` | 下記の共有条件を満たすときだけ | — |
| モック | `mocks/` | 画面ドメイン（`videos.ts`, `dashboard.ts`） | — |
| 定数（表示文言） | `constants/` | 画面ドメイン（`videos.ts`, `dashboard.ts`） | — |
| 画面パス | `routes.ts` | — | — |
| 画面CSS | `assets/css/<画面>.css` | ディレクトリ名（`video-list.css`） | — |

- `components/` 直下に `.vue` を置かない。
- 画面ディレクトリは kebab-case。ナビ `id` に合わせる（`video-list`, `dashboard`）。アップロードなら `upload`、設定なら `settings`。
- `prefix` はディレクトリ名の PascalCase（`video-list` → `VideoList`）。ファイル名に画面名を重複させない（`Table.vue` であり `VideoListTable.vue` ではない）。
- ルート要素クラスは `screen-<画面>`（`screen-video-list`）。
- 共通に置くのは **2画面以上** で使うものだけ（現状 `AppSidebar`, `AppIcon`）。見た目が似ていても1画面専用ならその画面のディレクトリに置く（各 `Header.vue` は共有しない）。
- layoutsは必要に応じて使用してもいいです。複数画面同じものを使用するという場合に限ってですが。1画面だけのシェルはページ（またはその画面のコンポーネント）に残す。`app.vue` は `NuxtPage` のみ。

`nuxt.config.ts` の登録例:

```ts
{
  path: '~/components/common',
  pathPrefix: false,
},
{
  path: '~/components/video-list',
  prefix: 'VideoList',
},
```

新しい画面では同じ形で `path` と `prefix` を追加する。

## layouts を切り出すか

外側の枠（サイドバー、ヘッダーシェルなど）が **2画面以上で同一** のときだけ `layouts/` に出す。1画面用に「念のため」作らない。

**切り出す:**

- [ ] 対象のページが2つ以上ある（これから同時に足す場合を含む）
- [ ] 共有するのは同一の外側の枠であり、似ているだけではない
- [ ] その同一構造をページ間で重複させないために出す

**切り出さない:**

- [ ] その構造を使うページが1つだけ
- [ ] 画面ごとに Header や枠が違う（似ていても各画面の `Header.vue` に置く）
- [ ] 将来の画面のために先回りする
- [ ] 1画面の整理目的だけで layout を増やす

条件を満たさない間は、各ページが `AppSidebar` と `main-content` を組み立てる。

## 何を抽出し、何をページに残すか

**ページ**（`pages/*.vue`）が持つもの:

- 画面シェル: `screen-*` / `AppSidebar` / `main-content` / `page-body` と、切り出した子の組み立て。上記の layout 条件を満たす共有の外側の枠は `layouts/` が持ち、ページには置かない
- セクションの枠（`.stats-row`, `.recent-section`, `.sec-header` など）
- `useHead`、画面の UI 状態、リストの絞り込み・ソート
- モックの **レコード配列** の import

**子コンポーネント**に切り出すもの:

1. **Header** — タイトルと画面の主アクション
2. **名前付きブロック** — Figma 上の独立した領域。動画一覧なら `FilterRow`（検索+ステータス+並びボタンを1つに）と `Table`（見出し行+データ行を1つに）
3. **繰り返しカード** — ダッシュボードの `StatCard` / `VideoRow` のように、同じ塊を `v-for` する単位

**切り出さない:**

- フィルター行の中の検索・select・ボタンを個別コンポーネントにしない
- 表形式の1行を `Table` からさらに切り出さない（カードリストのときだけ行コンポーネントにする）
- `page-body` やセクション枠だけのためのラッパーコンポーネント
- アイコンSVG（`AppIcon` に名前を足す）
- 仕様にない操作のための状態やコンポーネント（並び替えキーが無いならボタンは表示のみ）

## データと props

- レコード・ストレージキーは `mocks/` に置く。画面名・ボタン・フィールドラベルなど表示文言は `constants/` に置く。画面パスは `routes.ts` に置く。コンポーネントに表示用の固定文字列や配列を直書きしない。
- レコード配列（`videoListItems`, `dashboardStats`, `recentUploads`）は **ページだけ** が import し、子へ props で渡す。
- 子が import してよいのは型、ラベル、選択肢、列定義など表示契約（`videoListTitle`, `statusFilterOptions`, `videoTableColumns`, `videoStatusLabel`）。ラベル類は `constants/` から取る。
- 画面をまたぐ文言（ナビ、ユーザー表示名以外のステータスラベル、アップロードボタン）は `constants/dashboard.ts` を再利用し、複製しない。
- 一覧は props（`videos`, `stat`, `upload`）。フィルターなどページが持つ入力は `defineModel`。
- fetch / store / provide は使わない。ページがモックを読み、派生データを計算する。

## CSS

- Vue に `<style>` を書かない。
- サイドバー・ヘッダー・ボタン・バッジなど画面横断の枠は既存の `assets/css/dashboard.css` を再利用する。コピーして増やさない。
- その画面だけのクラスは `assets/css/<画面>.css` に書き、`nuxt.config.ts` の `css` 配列へ追加する。
- クラス名はマークアップの塊に合わせる（`filter-row`, `table-card`）。

## 新しい画面の手順

1. デザインから Header、名前付きブロック、繰り返しカードを洗い出す。迷ったら切り出さない。
2. `test/component-directories.spec.ts` にディレクトリの glob と期待ファイル名を追加する（直下 `.vue` は空のまま）。
3. `mocks/<画面>.ts` にデザインどおりのレコードを置き、画面名・ラベルは `constants/<画面>.ts` に、画面パスは `routes.ts` に置く。
4. `nuxt.config.ts` に `components` の `prefix` と `css` を足す。
5. ページでシェルを組み立て、状態と配列の派生を書く。複数画面が同じ外側の枠を共有する場合のみ `layouts/` に出し、1画面ならページに残す。prefix 付きのページ専用コンポーネントは行頭で明示 import する（自動解決はページ変換に乗らず、SSR とクライアントが食い違うことがある）。
6. 子は表示と入力だけにする。
7. `test/app.e2e.spec.ts` でページHTMLをモックのレコード値、`constants/` の文言、`routes.ts` のパスに対して検証する。子コンポーネント単体テストは追加しない。

## テスト

`test/component-directories.spec.ts` が分割の契約である。画面を足す・コンポーネントを足す・移すときは、期待ファイル名を先に合わせてから実装する。

ページ専用コンポーネントの明示 import と、`//` コメントが次の文を飲み込んでいないことは、全ページ・全コンポーネントを走査して契約する。画面を足すときに `expectLiveImport` を個別追加する必要はない。

E2E は組み立て後のページの SSR HTML を見る。分割したからといってテストをコンポーネント単位に分解しない。クライアントだけ欠ける表示は、上記のソース走査で防ぐ。

## 例

動画一覧（新しい画面の型）:

- `pages/videos.vue` — `query` / `statusFilter` と `visibleVideos`
- `components/video-list/Header.vue` / `FilterRow.vue` / `Table.vue`
- `<VideoListFilterRow v-model:query v-model:status-filter>` と `<VideoListTable :videos="visibleVideos">`

ダッシュボード（カードリスト）:

- セクション枠は `pages/index.vue` に残す
- 繰り返しだけ `StatCard.vue` / `VideoRow.vue` に出す
