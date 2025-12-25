/**
 * Seed data from data.json into Payload CMS (Hybrid mode)
 *
 * Usage: bun from-json-cms/seed-data.ts [--clear]
 *   --clear: Clear ALL existing data before seeding
 *
 * Default behavior (without --clear):
 *   - Collections with unique keys defined: UPSERT (update existing, create new)
 *   - Collections without unique keys (null in unique-keys.json): CLEAR + INSERT
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_PATH = path.resolve(__dirname, 'data.json')
const UNIQUE_KEYS_PATH = path.resolve(__dirname, 'unique-keys.json')

// Map data.json keys to Payload collection slugs (kebab-case)
const KEY_TO_SLUG: Record<string, string> = {
  articles: 'articles',
  pages: 'pages',
  products: 'products',
  attractions: 'attractions',
  attraction_categories: 'attraction-categories',
  temporary_closures: 'temporary-closures',
  experiences: 'experiences',
  restaurants: 'restaurants',
  food_menus: 'food-menus',
  spa: 'spa',
  crowdedness: 'crowdedness',
  calendar: 'calendar',
  night_show_calendar: 'night-show-calendar',
  day_show_calendar: 'day-show-calendar',
  calendar_restaurant: 'calendar-restaurant',
  goods: 'goods',
  goods_categories: 'goods-categories',
  shops: 'shops',
  areas: 'areas',
  partners: 'partners',
  hotels: 'hotels',
  translations: 'translations',
  park_service_guide: 'park-service-guide',
  spa_service_guide: 'spa-service-guide',
  topics: 'topics',
  important_news: 'important-news',
  ota_banners: 'ota-banners',
  access_ota_banners: 'access-ota-banners',
  ticket_notes: 'ticket-notes',
  premium_pass_notes: 'premium-pass-notes',
  ticket_notes_1day: 'ticket-notes-1day',
  ticket_notes_afternoon: 'ticket-notes-afternoon',
  ticket_notes_afternoon_set: 'ticket-notes-afternoon-set',
  ticket_notes_afternoon_plus: 'ticket-notes-afternoon-plus',
  ticket_notes_spa: 'ticket-notes-spa',
  ticket_notes_premium_pass: 'ticket-notes-premium-pass',
  ticket_notes_park_spa_1day: 'ticket-notes-park-spa-1day',
  ticket_notes_okinawa_resident: 'ticket-notes-okinawa-resident',
  ticket_notes_okinawa_kids_free: 'ticket-notes-okinawa-kids-free',
  ticket_notes_spa_guide: 'ticket-notes-spa-guide',
  comfort_navi_photo_list: 'comfort-navi-photo-list',
  tickets: 'tickets',
  premium_pass: 'premium-pass',
  premium_pass_list: 'premium-pass-list',
  jtb_banner: 'jtb-banner',
  parking_status: 'parking-status',
  experience_agreement: 'experience-agreement',
  reservation_pass: 'reservation-pass',
  timetable_tabs: 'timetable-tabs',
  timetable_tables: 'timetable-tables',
  timetable_times: 'timetable-times',
}

// Load unique keys from JSON file
// Keys in the JSON use data.json format (snake_case), need to map to slug format
function loadUniqueKeys(): Record<string, string[] | null> {
  if (!fs.existsSync(UNIQUE_KEYS_PATH)) {
    console.warn('Warning: unique-keys.json not found, UPSERT will always create new records')
    return {}
  }
  const raw = fs.readFileSync(UNIQUE_KEYS_PATH, 'utf-8')
  return JSON.parse(raw)
}

// Get unique keys for a collection (by data.json key name)
function getUniqueKeys(dataKey: string): string[] | null {
  const keysConfig = loadUniqueKeys()
  const keys = keysConfig[dataKey]
  if (keys === undefined) {
    return null // Not defined in config
  }
  return keys // null means no unique key (always create new)
}

async function clearCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
) {
  console.log(`  Clearing ${slug}...`)
  try {
    const existing = await payload.find({
      collection: slug as any,
      limit: 1000,
    })

    for (const doc of existing.docs) {
      await payload.delete({
        collection: slug as any,
        id: doc.id,
      })
    }
    console.log(`  Deleted ${existing.docs.length} documents from ${slug}`)
  } catch (error) {
    console.log(`  No existing data in ${slug}`)
  }
}

async function findExisting(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  dataKey: string,
  item: Record<string, unknown>,
): Promise<{ id: number | string } | null> {
  const uniqueKeys = getUniqueKeys(dataKey)
  if (!uniqueKeys) return null

  // Build where clause from unique keys
  const where: Record<string, { equals: unknown }> = {}
  for (const key of uniqueKeys) {
    const value = item[key]
    // Handle null values - use 'exists: false' equivalent
    if (value === null || value === undefined) {
      where[key] = { equals: null }
    } else {
      where[key] = { equals: value }
    }
  }

  try {
    const result = await payload.find({
      collection: slug as any,
      where,
      limit: 1,
    })
    return result.docs[0] as { id: number | string } | undefined ?? null
  } catch {
    return null
  }
}

async function upsertCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  dataKey: string,
  data: Record<string, unknown>[],
) {
  console.log(`\n[UPSERT] ${slug} (${data.length} items)...`)

  let created = 0
  let updated = 0
  let failed = 0

  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    try {
      // Transform null values to undefined (Payload prefers undefined for empty fields)
      const cleanedItem: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(item)) {
        cleanedItem[key] = value === null ? undefined : value
      }

      // Check if document already exists
      const existing = await findExisting(payload, slug, dataKey, item)

      if (existing) {
        // Update existing document
        console.log(`  [${i + 1}/${data.length}] Updating...`)
        await payload.update({
          collection: slug as any,
          id: existing.id,
          data: cleanedItem,
        })
        updated++
      } else {
        // Create new document
        console.log(`  [${i + 1}/${data.length}] Creating...`)
        await payload.create({
          collection: slug as any,
          data: cleanedItem,
        })
        created++
      }
    } catch (error) {
      failed++
      console.error(`  Error upserting item:`, error instanceof Error ? error.message : error)
    }
  }

  console.log(`  Completed: ${created} created, ${updated} updated, ${failed} failed`)
  return { created, updated, failed }
}

async function clearAndInsertCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  data: Record<string, unknown>[],
) {
  console.log(`\n[CLEAR+INSERT] ${slug} (${data.length} items)...`)

  await clearCollection(payload, slug)

  let created = 0
  let failed = 0

  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    try {
      const cleanedItem: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(item)) {
        cleanedItem[k] = v === null ? undefined : v
      }
      console.log(`  [${i + 1}/${data.length}] Creating...`)
      await payload.create({
        collection: slug as any,
        data: cleanedItem,
      })
      created++
    } catch (error) {
      failed++
      console.error(`  Error:`, error instanceof Error ? error.message : error)
    }
  }

  console.log(`  Completed: ${created} created, ${failed} failed`)
  return { created, failed }
}

async function seed() {
  const shouldClearAll = process.argv.includes('--clear')

  console.log('=== Payload CMS Data Seeder ===\n')
  if (shouldClearAll) {
    console.log('Mode: CLEAR ALL + INSERT (will delete all existing data first)')
  } else {
    console.log('Mode: HYBRID')
    console.log('  - Collections with unique keys: UPSERT')
    console.log('  - Collections without unique keys: CLEAR + INSERT')
  }
  console.log('\nReading data.json...')

  if (!fs.existsSync(DATA_PATH)) {
    console.error('Error: data.json not found. Run fetch-data.ts first.')
    process.exit(1)
  }

  const rawData = fs.readFileSync(DATA_PATH, 'utf-8')
  const data: Record<string, Record<string, unknown>[]> = JSON.parse(rawData)

  console.log('Initializing Payload...')
  const payload = await getPayload({ config: await config })

  const stats = {
    totalCreated: 0,
    totalUpdated: 0,
    totalFailed: 0,
  }

  for (const [key, items] of Object.entries(data)) {
    const slug = KEY_TO_SLUG[key]
    if (!slug) {
      console.log(`Skipping unknown collection: ${key}`)
      continue
    }

    if (!Array.isArray(items)) {
      console.log(`Skipping ${key}: not an array`)
      continue
    }

    // Determine mode for this collection
    const uniqueKeys = getUniqueKeys(key)
    const shouldClearThis = shouldClearAll || uniqueKeys === null

    if (shouldClearThis) {
      // No unique keys or --clear flag: clear + insert
      const result = await clearAndInsertCollection(payload, slug, items)
      stats.totalCreated += result.created
      stats.totalFailed += result.failed
    } else {
      // Has unique keys: UPSERT
      const result = await upsertCollection(payload, slug, key, items)
      stats.totalCreated += result.created
      stats.totalUpdated += result.updated
      stats.totalFailed += result.failed
    }
  }

  console.log('\n=== Summary ===')
  console.log(`Total created: ${stats.totalCreated}`)
  console.log(`Total updated: ${stats.totalUpdated}`)
  console.log(`Total failed: ${stats.totalFailed}`)

  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
