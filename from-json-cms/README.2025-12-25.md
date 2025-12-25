# 対応事項（2025年12月25日）

このCMSを正常に運用するために、元データ（data.json のソース）で以下の対応が必要です。

---

## 優先度: 高

### slugがnullのレコードを修正

対象コレクション: `articles`

現状: 54件中42件が `slug: null` のため、UPSERTが正しく動作せずシードに失敗します。

対応:

```json
// Before
{ "slug": null, "title": "記事タイトル", ... }

// After
{ "slug": "article-2025-12-25-title", "title": "記事タイトル", ... }
```

---

### idフィールドをリネーム

対象コレクション: `attraction_categories`, `goods_categories`, `tickets`, `premium_pass`, `premium_pass_list`, `parking_status`, `timetable_tabs`, `timetable_tables`, `timetable_times`

現状: 元データの `id` フィールドがPayloadの内部 `id` と競合し、エクスポート時に削除されます。

対応:

```json
// Before
{ "id": "family-friendly", "category": "小さなお子さまと楽しめる" }

// After
{ "category_id": "family-friendly", "category": "小さなお子さまと楽しめる" }
```

リネーム対象:

| コレクション | 現在 | 変更後 |
|-------------|------|--------|
| attraction_categories | id | category_id |
| goods_categories | id | category_id |
| tickets | id | ticket_id |
| premium_pass | id | pass_id |
| premium_pass_list | id | item_id |
| parking_status | id | status_id |
| timetable_tabs | id | tab_id |
| timetable_tables | id | table_id |
| timetable_times | id | time_id |

---

## 優先度: 中

### ユニークキーが不安定なコレクションにslugを追加

対象コレクション: `partners`, `hotels`, `important_news`, `ota_banners`, `jtb_banner`

現状: `name` や `title` など変更可能なフィールドをユニークキーにしているため、名前変更時に重複が発生します。

対応:

```json
// partners, hotels
{ "slug": "partner-name", "name": "パートナー名", ... }

// important_news
{ "slug": "news-2025-12-25", "title": "お知らせタイトル", ... }

// ota_banners
{ "banner_id": "ota-001", "language": "ja", ... }

// jtb_banner
{ "banner_id": "jtb-001", "text": "バナーテキスト", ... }
```

---

### reservation_pass にユニークキーを追加

現状: `id` と `text` の組み合わせでマッチングしていますが、重複が発生しています。

対応:

```json
{ "item_id": "guidelines-1", "id": "guidelines", "text": "...", ... }
```

---

### experience_agreement にユニークキーを追加

現状: ユニークキーが設定されていないため、UPSERTが機能しません。

対応:

```json
{ "agreement_id": "human-arrow-1", "name": "ヒューマン アロー", ... }
```

---

## 対応後の作業

元データを修正したら、以下を実行してください:

```bash
# スキーマを再取得
bun from-json-cms/fetch-data.ts

# コレクション再生成
bun from-json-cms/generate-collections.ts

# マイグレーション
bunx payload migrate:create
bunx payload migrate

# unique-keys.json を更新（リネームしたフィールド名に変更）

# ユニークキー検証
bun from-json-cms/validate-keys.ts

# ローカルでシード
bun from-json-cms/seed-data.ts --clear

# 比較
bun from-json-cms/compare-json.ts
```

---

## 本番環境への反映

```bash
# SQLファイル生成
bun from-json-cms/generate-sql.ts

# リモートD1に実行
bun wrangler d1 execute D1 --remote --file=from-json-cms/seed.sql
```
