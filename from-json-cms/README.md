# from-json-cms

JSON SchemaからPayload CMSのコレクションを自動生成し、データをシードするツール群。

## ファイル構成

```
from-json-cms/
├── data.json               # 元データ（gitignore、APIから取得）
├── data.schema.json        # JSON Schema定義
├── unique-keys.json        # ユニークキー定義（UPSERT用）
├── fetch-data.ts           # APIからデータ取得
├── generate-collections.ts # コレクション生成
├── generate-sql.ts         # SQL INSERT文生成
├── seed.sql                # 生成されたSQL（gitignore）
├── seed-data.ts            # データシード（Payload API経由）
├── validate-keys.ts        # ユニークキー検証
└── compare-json.ts         # JSON比較
```

## 環境変数

```env
JSON_API_URL=https://example.com/api/data
JSON_API_KEY=your-api-key
```

## 使い方

### データ取得とコレクション生成

```bash
bun from-json-cms/fetch-data.ts
bun from-json-cms/generate-collections.ts
bunx payload migrate:create
bunx payload migrate
```

### ローカルシード

```bash
# ハイブリッドモード（推奨）
bun from-json-cms/seed-data.ts

# 全削除してからシード
bun from-json-cms/seed-data.ts --clear
```

ハイブリッドモード:

- unique-keys.json に定義あり → UPSERT
- unique-keys.json が null → CLEAR+INSERT

### 本番シード

Payload API経由は本番D1でタイムアウトするため、SQL直接実行が必要：

```bash
bun from-json-cms/generate-sql.ts
bun wrangler d1 execute D1 --remote --file=from-json-cms/seed.sql
```

## SQL生成の特記事項

`generate-sql.ts` の特別な処理：

- `PRAGMA foreign_keys = OFF/ON` で外部キー制約を一時無効化
- `experience_agreement`, `reservation_pass` の `id` → `original_id` に自動リネーム

## 本番デプロイ時の注意

新しいコレクションを追加した場合：

```bash
NODE_ENV=production PAYLOAD_SECRET=ignore bunx payload migrate
bun wrangler d1 execute D1 --remote --command='PRAGMA optimize'
```

手動でCREATE TABLEを実行してもPayload内部テーブル（`payload_locked_documents_rels`）は更新されません。必ずマイグレーション経由で追加してください。

## 既知の問題

詳細は [README.2025-12-25.md](./README.2025-12-25.md) を参照。

- `slug: null` のレコードがUPSERTで正しく処理されない
- 一部コレクションでユニークキーが不安定
