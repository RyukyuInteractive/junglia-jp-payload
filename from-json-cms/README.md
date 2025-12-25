# from-json-cms

JSON SchemaからPayload CMSのコレクションを自動生成し、データをシードするツール群。

## ファイル構成

```
from-json-cms/
├── data.json             # 元データ（gitignore、APIから取得）
├── data.schema.json      # JSON Schema定義
├── unique-keys.json      # ユニークキー定義（UPSERT用）
├── fetch-data.ts         # APIからデータ取得スクリプト
├── generate-collections.ts # コレクション生成スクリプト
├── generate-sql.ts       # SQL INSERT文生成スクリプト
├── seed.sql              # 生成されたSQL（gitignore）
├── seed-data.ts          # データシードスクリプト（Payload API経由）
├── validate-keys.ts      # ユニークキー検証スクリプト
└── compare-json.ts       # JSON比較スクリプト
```

## 環境変数

`.env`に以下を設定:

```env
JSON_API_URL=https://example.com/api/data
JSON_API_KEY=your-api-key
```

## 使い方

### 1. 最新データの取得

APIから最新のデータとスキーマを取得します。

```bash
bun from-json-cms/fetch-data.ts
```

### 2. コレクション生成

`data.schema.json`を読み込み、Payload CMSのコレクション定義ファイルを`src/collections/`に生成します。

```bash
bun from-json-cms/generate-collections.ts
```

生成されるファイル:
- `src/collections/{collection-name}.ts` - 各コレクション定義
- `src/collections/index.generated.ts` - エクスポート用インデックス

### 3. payload.config.ts への登録

生成後、`src/payload.config.ts`に以下を追加:

```typescript
import { collections as generatedCollections } from './collections/index.generated'

// ...

export default buildConfig({
  // ...
  collections: [Users, Media, ...generatedCollections],
})
```

### 4. マイグレーション生成・実行

```bash
# マイグレーション生成
bunx payload migrate:create

# マイグレーション実行
bunx payload migrate
```

### 5. ユニークキー検証（推奨）

データシード前に、ユニークキーの整合性を検証します：

```bash
bun from-json-cms/validate-keys.ts
```

検証内容：
- 指定されたキーが全レコードに存在するか
- キーフィールドにnull値がないか
- キーの組み合わせが実際にユニークか

問題がある場合は修正してからシードしてください。

### 6. データシード

データをPayload CMSにインポートします。**デフォルトはハイブリッドモード**です。

```bash
# ハイブリッドモード（推奨）
bun from-json-cms/seed-data.ts

# 全データを削除してからシード（危険: CMSで編集したデータも消える）
bun from-json-cms/seed-data.ts --clear
```

**ハイブリッドモードの動作：**

| unique-keys.json の値 | 動作 | 例 |
|----------------------|------|-----|
| `["slug"]` など | UPSERT（既存は更新、新規は作成） | articles, pages |
| `null` | CLEAR+INSERT（削除して再作成） | temporary_closures, crowdedness |

これにより、安定したユニークキーがあるコレクションはデータを保持しつつ更新され、ユニークキーがないコレクションは毎回クリーンに再作成されます。

#### 本番環境へのシード

**重要**: 本番環境（Cloudflare D1）へのシードは、必ずwrangler経由でSQLを直接実行してください。

Payload API経由（`seed-data.ts`）は本番環境では動作しません。理由：
- ローカルからリモートD1への接続時、Payload APIの初回クエリでタイムアウトが発生する
- `getCloudflareContext`がCLI環境で正しく初期化されない
- Wranglerのバインディング経由でのみリモートD1にアクセス可能

```bash
# 1. 最新データを取得
bun from-json-cms/fetch-data.ts

# 2. SQLファイル生成
bun from-json-cms/generate-sql.ts

# 3. リモートD1に実行
bun wrangler d1 execute D1 --remote --file=from-json-cms/seed.sql
```

**注意**: SQL経由はDELETE + INSERTです。D1はSQLトランザクション文（BEGIN/COMMIT）をサポートしていませんが、wranglerがバッチ実行時にエラーが発生した場合は元の状態に戻ります。CMSで直接編集したデータは上書きされます。

### 7. データ比較

ローカルの`data.json`とCMSのエクスポートを比較します：

```bash
# ローカルCMS（localhost:3002）と比較
bun from-json-cms/compare-json.ts

# 本番CMSと比較
EXPORT_API_URL=https://your-cms.example.com/api/export bun from-json-cms/compare-json.ts
```

比較時に無視されるもの：
- 配列の順序
- Payloadが追加するフィールド（`id`, `createdAt`, `updatedAt`）

## 生成されるコレクション

| コレクション | slug | 変数名 |
|-------------|------|--------|
| Articles | articles | Articles |
| Pages | pages | Pages |
| Products | products | Products |
| Attractions | attractions | Attractions |
| Restaurants | restaurants | Restaurants |
| Spa | spa | Spa |
| Areas | areas | Areas |
| Partners | partners | Partners |
| Hotels | hotels | Hotels |
| ServiceGuide | service-guide | ServiceGuide |
| ImportantNews | important-news | ImportantNews |
| OtaBanners | ota-banners | OtaBanners |
| Tickets | tickets | Tickets |
| JtbBanner | jtb-banner | JtbBanner |
| Translations | translations | Translations |

## 命名規則

- **ファイル名**: kebab-case（例: `service-guide.ts`）
- **変数名**: PascalCase（例: `ServiceGuide`）
- **slug**: kebab-case（例: `service-guide`）
- **フィールド名**: snake_case（元データのまま、例: `title_en`）

## カスタマイズ

### スキップするコレクション

`generate-collections.ts`の`SKIP_COLLECTIONS`配列を編集:

```typescript
const SKIP_COLLECTIONS = ['$schema']
```

### フィールドタイプのマッピング

`getPayloadFieldType`関数で、JSON SchemaタイプからPayloadフィールドタイプへの変換をカスタマイズできます。

---

## UPSERTとユニークキーについて

> 2025年12月25日時点の情報

UPSERTを正しく動作させるには、各レコードに**安定したユニークキー**が必要です。
ユニークキーは `unique-keys.json` で一元管理されており、`seed-data.ts` と `validate-keys.ts` が参照します。

現状、一部のコレクションでは`name`や`title`などの変更可能なフィールドをキーにしているため、
名前を変更するとUPSERTが新規レコードとして認識し、重複が発生します。

### 現状のユニークキー

| コレクション | 現在のキー | 安定性 | 推奨 |
|-------------|-----------|--------|------|
| articles | `slug` | ✅ 安定 | - |
| pages | `path` | ✅ 安定 | - |
| products | `slug` | ✅ 安定 | - |
| attractions | `slug` | ✅ 安定 | - |
| restaurants | `slug` | ✅ 安定 | - |
| spa | `slug` | ✅ 安定 | - |
| areas | `slug` | ✅ 安定 | - |
| partners | `name` | ⚠️ 変更可能 | `slug`を追加 |
| hotels | `name` | ⚠️ 変更可能 | `slug`を追加 |
| translations | `path` + `key` | ✅ 安定 | - |
| service_guide | `category` + `title` | ⚠️ titleはnull可 | `slug`を追加 |
| important_news | `title` | ⚠️ 変更可能 | `slug`を追加 |
| ota_banners | `language` + `event` | ⚠️ eventは変更可能 | `id`を追加 |
| tickets | `id` | ✅ 安定 | - |
| jtb_banner | `text` | ⚠️ 変更可能 | `id`を追加 |

### 推奨される変更

元データ（`data.json`のソース）に以下のフィールドを追加してください：

#### partners / hotels

```json
{
  "slug": "unique-identifier",  // 追加
  "name": "名前",
  ...
}
```

#### service_guide

```json
{
  "slug": "category-item-name",  // 追加
  "category": "カテゴリ",
  "title": "タイトル",
  ...
}
```

#### important_news

```json
{
  "slug": "news-2024-12-25",  // 追加（日付ベースなど）
  "title": "お知らせタイトル",
  ...
}
```

#### ota_banners / jtb_banner

```json
{
  "id": "banner-001",  // 追加
  ...
}
```

### 変更後の作業

1. **元データにslug/idを追加**
2. **スキーマを更新** (`data.schema.json`)
3. **コレクション再生成**
   ```bash
   bun from-json-cms/generate-collections.ts
   ```
4. **マイグレーション**
   ```bash
   bunx payload migrate:create
   bunx payload migrate
   ```
5. **unique-keys.jsonを更新**
   ```json
   {
     "partners": ["slug"],
     "hotels": ["slug"],
     "important_news": ["slug"],
     "ota_banners": ["id"],
     "jtb_banner": ["id"]
   }
   ```
6. **ユニークキーを検証**
   ```bash
   bun from-json-cms/validate-keys.ts
   ```

### 一時的な回避策

元データを変更できない場合は、`--clear`フラグを使って毎回クリーンな状態からシードしてください：

```bash
bun from-json-cms/seed-data.ts --clear
```

ただし、CMSで直接編集したデータは失われます。

---

## 既知の問題

元データに起因する問題があります。詳細と対応方法は [README.2025-12-25.md](./README.2025-12-25.md) を参照してください。

主な問題:

- `slug: null` のレコードがUPSERTで正しく処理されない
- 元データの `id` フィールドがPayloadの内部 `id` と競合
- ユニークキー不足による重複レコード
