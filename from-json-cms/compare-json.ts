/**
 * Compare local data.json with this CMS's export endpoint
 *
 * Usage: bun from-json-cms/compare-json.ts
 *
 * Required environment variables:
 *   JSON_API_KEY - API authentication key (for export endpoint)
 *   EXPORT_API_URL - This CMS's export endpoint (default: http://localhost:3002/api/export)
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_PATH = path.resolve(__dirname, 'data.json')
const apiKey = process.env.JSON_API_KEY
const exportApiUrl = process.env.EXPORT_API_URL || 'http://localhost:3002/api/export'

if (!apiKey) {
  console.error('Error: JSON_API_KEY environment variable is required')
  process.exit(1)
}

if (!fs.existsSync(DATA_PATH)) {
  console.error('Error: data.json not found. Run fetch-data.ts first.')
  process.exit(1)
}

interface CompareResult {
  collection: string
  local: number
  exported: number
  match: boolean
  differences?: string[]
}

// Fields added by Payload that should be ignored in comparison
const IGNORE_FIELDS = ['id', 'createdAt', 'updatedAt']

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a === null || b === null) return a === b
  if (typeof a !== typeof b) return false
  if (typeof a !== 'object') return a === b

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    // Sort arrays before comparison to ignore order
    const sortedA = [...a].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)))
    const sortedB = [...b].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)))
    return sortedA.every((item, i) => deepEqual(item, sortedB[i]))
  }

  if (Array.isArray(a) || Array.isArray(b)) return false

  const aObj = a as Record<string, unknown>
  const bObj = b as Record<string, unknown>

  // Filter out ignored fields
  const aKeys = Object.keys(aObj).filter((k) => !IGNORE_FIELDS.includes(k))
  const bKeys = Object.keys(bObj).filter((k) => !IGNORE_FIELDS.includes(k))

  if (aKeys.length !== bKeys.length) return false

  return aKeys.every((key) => deepEqual(aObj[key], bObj[key]))
}

function findDifferences(
  external: Record<string, unknown>[],
  exported: Record<string, unknown>[],
  keyField: string = 'slug'
): string[] {
  const differences: string[] = []

  const externalMap = new Map(
    external.map((item) => [item[keyField] || JSON.stringify(item), item])
  )
  const exportedMap = new Map(
    exported.map((item) => [item[keyField] || JSON.stringify(item), item])
  )

  // Check for missing in exported
  for (const [key] of externalMap) {
    if (!exportedMap.has(key)) {
      differences.push(`Missing in export: ${key}`)
    }
  }

  // Check for extra in exported
  for (const [key] of exportedMap) {
    if (!externalMap.has(key)) {
      differences.push(`Extra in export: ${key}`)
    }
  }

  // Check for differences in matching items
  for (const [key, externalItem] of externalMap) {
    const exportedItem = exportedMap.get(key)
    if (exportedItem && !deepEqual(externalItem, exportedItem)) {
      differences.push(`Different: ${key}`)
    }
  }

  return differences
}

async function fetchJson(url: string, token: string): Promise<Record<string, unknown>> {
  const resp = await fetch(url, {
    headers: { authorization: `Bearer ${token}` },
  })

  if (!resp.ok) {
    throw new Error(`Failed to fetch ${url}: ${resp.status} ${resp.statusText}`)
  }

  return resp.json() as Promise<Record<string, unknown>>
}

async function compare() {
  console.log('=== JSON Comparison Tool ===\n')
  console.log(`Local data: ${DATA_PATH}`)
  console.log(`Export API: ${exportApiUrl}\n`)

  console.log('Loading data...')

  const localData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Record<string, unknown>
  const exportedData = await fetchJson(exportApiUrl, apiKey!)

  // Remove schema field if present
  delete localData.$schema
  delete exportedData.$schema

  const results: CompareResult[] = []

  // Only compare collections that exist in BOTH sources
  const localKeys = new Set(Object.keys(localData))
  const exportedKeys = new Set(Object.keys(exportedData))
  const commonKeys = [...localKeys].filter((k) => exportedKeys.has(k))

  // Report collections only in local
  const onlyInLocal = [...localKeys].filter((k) => !exportedKeys.has(k))
  if (onlyInLocal.length > 0) {
    console.log(`\n⚠️  Collections only in local data.json (${onlyInLocal.length}):`)
    console.log(`   ${onlyInLocal.join(', ')}`)
    console.log('   (These are not in CMS - run generate-collections.ts to add them)\n')
  }

  // Report collections only in export
  const onlyInExport = [...exportedKeys].filter((k) => !localKeys.has(k))
  if (onlyInExport.length > 0) {
    console.log(`\n⚠️  Collections only in CMS export (${onlyInExport.length}):`)
    console.log(`   ${onlyInExport.join(', ')}\n`)
  }

  console.log('=== Comparison Results ===\n')

  for (const key of commonKeys) {
    const local = (localData[key] as Record<string, unknown>[]) || []
    const exported = (exportedData[key] as Record<string, unknown>[]) || []

    const differences = findDifferences(local, exported)
    const match = differences.length === 0 && local.length === exported.length

    const result: CompareResult = {
      collection: key,
      local: local.length,
      exported: exported.length,
      match,
      differences: differences.length > 0 ? differences : undefined,
    }

    results.push(result)

    const status = match ? '✓' : '✗'
    console.log(`${status} ${key}: ${local.length} (local) vs ${exported.length} (export)`)

    if (differences.length > 0) {
      differences.slice(0, 5).forEach((diff) => console.log(`    - ${diff}`))
      if (differences.length > 5) {
        console.log(`    ... and ${differences.length - 5} more`)
      }
    }
  }

  const allMatch = results.every((r) => r.match)

  console.log('\n=== Summary ===')
  console.log(`Total collections: ${results.length}`)
  console.log(`Matching: ${results.filter((r) => r.match).length}`)
  console.log(`Differences: ${results.filter((r) => !r.match).length}`)
  console.log(`\nOverall: ${allMatch ? 'MATCH ✓' : 'MISMATCH ✗'}`)

  process.exit(allMatch ? 0 : 1)
}

compare().catch((error) => {
  console.error('Comparison failed:', error)
  process.exit(1)
})

export {}
