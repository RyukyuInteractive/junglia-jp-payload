/**
 * Generate SQL INSERT statements from data.json
 * Then execute with: wrangler d1 execute D1 --remote --file=from-json-cms/seed.sql
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_PATH = path.resolve(__dirname, 'data.json')
const OUTPUT_PATH = path.resolve(__dirname, 'seed.sql')

// Map data.json keys to Payload table names (snake_case)
const KEY_TO_TABLE: Record<string, string> = {
  articles: 'articles',
  pages: 'pages',
  products: 'products',
  attractions: 'attractions',
  attraction_categories: 'attraction_categories',
  temporary_closures: 'temporary_closures',
  experiences: 'experiences',
  restaurants: 'restaurants',
  food_menus: 'food_menus',
  spa: 'spa',
  crowdedness: 'crowdedness',
  calendar: 'calendar',
  night_show_calendar: 'night_show_calendar',
  day_show_calendar: 'day_show_calendar',
  calendar_restaurant: 'calendar_restaurant',
  goods: 'goods',
  goods_categories: 'goods_categories',
  shops: 'shops',
  areas: 'areas',
  partners: 'partners',
  hotels: 'hotels',
  translations: 'translations',
  park_service_guide: 'park_service_guide',
  spa_service_guide: 'spa_service_guide',
  topics: 'topics',
  important_news: 'important_news',
  ota_banners: 'ota_banners',
  access_ota_banners: 'access_ota_banners',
  ticket_notes: 'ticket_notes',
  premium_pass_notes: 'premium_pass_notes',
  ticket_notes_1day: 'ticket_notes_1day',
  ticket_notes_afternoon: 'ticket_notes_afternoon',
  ticket_notes_afternoon_set: 'ticket_notes_afternoon_set',
  ticket_notes_afternoon_plus: 'ticket_notes_afternoon_plus',
  ticket_notes_spa: 'ticket_notes_spa',
  ticket_notes_premium_pass: 'ticket_notes_premium_pass',
  ticket_notes_park_spa_1day: 'ticket_notes_park_spa_1day',
  ticket_notes_okinawa_resident: 'ticket_notes_okinawa_resident',
  ticket_notes_okinawa_kids_free: 'ticket_notes_okinawa_kids_free',
  ticket_notes_spa_guide: 'ticket_notes_spa_guide',
  comfort_navi_photo_list: 'comfort_navi_photo_list',
  tickets: 'tickets',
  premium_pass: 'premium_pass',
  premium_pass_list: 'premium_pass_list',
  jtb_banner: 'jtb_banner',
  parking_status: 'parking_status',
  experience_agreement: 'experience_agreement',
  reservation_pass: 'reservation_pass',
  timetable_tabs: 'timetable_tabs',
  timetable_tables: 'timetable_tables',
  timetable_times: 'timetable_times',
}

function escapeString(value: unknown): string {
  if (value === null || value === undefined) {
    return 'NULL'
  }
  if (typeof value === 'boolean') {
    return value ? '1' : '0'
  }
  if (typeof value === 'number') {
    return String(value)
  }
  const str = String(value).replace(/'/g, "''")
  return `'${str}'`
}

// Collections where 'id' field from data.json is NOT unique and conflicts with Payload's auto-generated id
// These need the 'id' field renamed to avoid conflicts
const RENAME_ID_FIELD: Record<string, string> = {
  experience_agreement: 'original_id',
  reservation_pass: 'original_id',
}

function generateInsert(table: string, item: Record<string, unknown>, dataKey: string): string {
  // Create a copy with potentially renamed fields
  const processedItem: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(item)) {
    if (key === 'id' && RENAME_ID_FIELD[dataKey]) {
      // Rename 'id' to avoid conflict with Payload's auto-generated id
      processedItem[RENAME_ID_FIELD[dataKey]] = value
    } else {
      processedItem[key] = value
    }
  }

  const columns = Object.keys(processedItem).join(', ')
  const values = Object.values(processedItem).map(escapeString).join(', ')

  return `INSERT INTO ${table} (${columns}) VALUES (${values});`
}

console.log('Reading data.json...')

if (!fs.existsSync(DATA_PATH)) {
  console.error('Error: data.json not found. Run fetch-data.ts first.')
  process.exit(1)
}

const rawData = fs.readFileSync(DATA_PATH, 'utf-8')
const data: Record<string, Record<string, unknown>[]> = JSON.parse(rawData)

const sqlStatements: string[] = []

// Note: D1 doesn't support SQL transaction statements (BEGIN/COMMIT)
// D1 automatically handles atomicity for batched statements via wrangler

// Disable foreign key checks to avoid constraint errors during delete
sqlStatements.push('PRAGMA foreign_keys = OFF;')

// First, delete from Payload system tables that may have references
console.log('Adding DELETE statements for Payload system tables...')
sqlStatements.push('DELETE FROM payload_locked_documents_rels;')
sqlStatements.push('DELETE FROM payload_locked_documents;')

// Then, add DELETE statements to clear existing data
console.log('Adding DELETE statements...')
for (const table of Object.values(KEY_TO_TABLE)) {
  sqlStatements.push(`DELETE FROM ${table};`)
}

// Then add INSERT statements
for (const [key, items] of Object.entries(data)) {
  const table = KEY_TO_TABLE[key]
  if (!table) {
    console.log(`Skipping unknown collection: ${key}`)
    continue
  }

  if (!Array.isArray(items)) {
    console.log(`Skipping ${key}: not an array`)
    continue
  }

  console.log(`Generating SQL for ${table} (${items.length} items)...`)

  for (const item of items) {
    sqlStatements.push(generateInsert(table, item, key))
  }
}

// Re-enable foreign key checks
sqlStatements.push('PRAGMA foreign_keys = ON;')

fs.writeFileSync(OUTPUT_PATH, sqlStatements.join('\n'))
console.log(`\nGenerated: ${OUTPUT_PATH}`)
console.log(`Total statements: ${sqlStatements.length}`)
console.log('\nTo execute:')
console.log('  wrangler d1 execute D1 --remote --file=from-json-cms/seed.sql')

export {}
