import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { handle } from 'hono/vercel'
import { getPayload } from 'payload'
import config from '@/payload.config'

const app = new Hono().basePath('/api/export')

// Bearer認証
const token = process.env.JSON_API_KEY
if (token) {
  app.use('*', bearerAuth({ token }))
}

// コレクションとデータキーのマッピング (slug: kebab-case, key: snake_case)
const COLLECTIONS = [
  { slug: 'articles', key: 'articles' },
  { slug: 'pages', key: 'pages' },
  { slug: 'products', key: 'products' },
  { slug: 'attractions', key: 'attractions' },
  { slug: 'attraction-categories', key: 'attraction_categories' },
  { slug: 'temporary-closures', key: 'temporary_closures' },
  { slug: 'experiences', key: 'experiences' },
  { slug: 'restaurants', key: 'restaurants' },
  { slug: 'food-menus', key: 'food_menus' },
  { slug: 'spa', key: 'spa' },
  { slug: 'crowdedness', key: 'crowdedness' },
  { slug: 'calendar', key: 'calendar' },
  { slug: 'night-show-calendar', key: 'night_show_calendar' },
  { slug: 'day-show-calendar', key: 'day_show_calendar' },
  { slug: 'calendar-restaurant', key: 'calendar_restaurant' },
  { slug: 'goods', key: 'goods' },
  { slug: 'goods-categories', key: 'goods_categories' },
  { slug: 'shops', key: 'shops' },
  { slug: 'areas', key: 'areas' },
  { slug: 'partners', key: 'partners' },
  { slug: 'hotels', key: 'hotels' },
  { slug: 'translations', key: 'translations' },
  { slug: 'park-service-guide', key: 'park_service_guide' },
  { slug: 'spa-service-guide', key: 'spa_service_guide' },
  { slug: 'topics', key: 'topics' },
  { slug: 'important-news', key: 'important_news' },
  { slug: 'ota-banners', key: 'ota_banners' },
  { slug: 'access-ota-banners', key: 'access_ota_banners' },
  { slug: 'ticket-notes', key: 'ticket_notes' },
  { slug: 'premium-pass-notes', key: 'premium_pass_notes' },
  { slug: 'ticket-notes-1day', key: 'ticket_notes_1day' },
  { slug: 'ticket-notes-afternoon', key: 'ticket_notes_afternoon' },
  { slug: 'ticket-notes-afternoon-set', key: 'ticket_notes_afternoon_set' },
  { slug: 'ticket-notes-afternoon-plus', key: 'ticket_notes_afternoon_plus' },
  { slug: 'ticket-notes-spa', key: 'ticket_notes_spa' },
  { slug: 'ticket-notes-premium-pass', key: 'ticket_notes_premium_pass' },
  { slug: 'ticket-notes-park-spa-1day', key: 'ticket_notes_park_spa_1day' },
  { slug: 'ticket-notes-okinawa-resident', key: 'ticket_notes_okinawa_resident' },
  { slug: 'ticket-notes-okinawa-kids-free', key: 'ticket_notes_okinawa_kids_free' },
  { slug: 'ticket-notes-spa-guide', key: 'ticket_notes_spa_guide' },
  { slug: 'comfort-navi-photo-list', key: 'comfort_navi_photo_list' },
  { slug: 'tickets', key: 'tickets' },
  { slug: 'premium-pass', key: 'premium_pass' },
  { slug: 'premium-pass-list', key: 'premium_pass_list' },
  { slug: 'jtb-banner', key: 'jtb_banner' },
  { slug: 'parking-status', key: 'parking_status' },
  { slug: 'experience-agreement', key: 'experience_agreement' },
  { slug: 'reservation-pass', key: 'reservation_pass' },
  { slug: 'timetable-tabs', key: 'timetable_tabs' },
  { slug: 'timetable-tables', key: 'timetable_tables' },
  { slug: 'timetable-times', key: 'timetable_times' },
] as const

// メインエンドポイント - data.json形式で返却
app.get('/', async (c) => {
  const payload = await getPayload({ config })

  const result: Record<string, unknown[]> = {}

  for (const { slug, key } of COLLECTIONS) {
    try {
      const { docs } = await payload.find({
        collection: slug as any,
        limit: 10000,
        pagination: false,
      })

      // Payloadのメタデータを除去してクリーンなデータを返す
      result[key] = docs.map((doc) => {
        const { id, createdAt, updatedAt, ...rest } = doc as any
        return rest
      })
    } catch (error) {
      console.error(`Error fetching ${slug}:`, error)
      result[key] = []
    }
  }

  return c.json(result)
})

// スキーマエンドポイント
app.get('/schema.json', async (c) => {
  // 静的なスキーマを返すか、動的に生成
  // ここでは簡易的にコレクション名のリストを返す
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: Object.fromEntries(
      COLLECTIONS.map(({ key }) => [
        key,
        { type: 'array', items: { type: 'object' } },
      ])
    ),
  }

  return c.json(schema)
})

export const GET = handle(app)
