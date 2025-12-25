# 対応事項（2025年12月25日）

元データ（data.json のソース）で以下の対応が必要です。

---

## 優先度: 高

### slugがnullのレコードを修正

対象: `articles`（54件中42件が `slug: null`）

```json
// Before
{ "slug": null, "title": "記事タイトル", ... }

// After
{ "slug": "article-2025-12-25-title", "title": "記事タイトル", ... }
```

---

### idフィールドをリネーム

対象: `attraction_categories`, `goods_categories`, `tickets`, `premium_pass`, `premium_pass_list`, `parking_status`, `timetable_tabs`, `timetable_tables`, `timetable_times`

元データの `id` がPayloadの内部 `id` と競合します。

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

対象: `partners`, `hotels`, `important_news`, `ota_banners`, `jtb_banner`

`name` や `title` など変更可能なフィールドをユニークキーにしているため、名前変更時に重複が発生します。

---

## 対応後の作業

```bash
bun from-json-cms/fetch-data.ts
bun from-json-cms/generate-collections.ts
bunx payload migrate:create
bunx payload migrate
# unique-keys.json を更新
bun from-json-cms/validate-keys.ts
bun from-json-cms/seed-data.ts --clear
```

---

## 本番環境への反映

```bash
NODE_ENV=production PAYLOAD_SECRET=ignore bunx payload migrate
bun from-json-cms/generate-sql.ts
bun wrangler d1 execute D1 --remote --file=from-json-cms/seed.sql
```
