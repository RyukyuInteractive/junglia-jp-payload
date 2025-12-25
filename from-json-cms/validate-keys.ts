/**
 * Validate unique keys for each collection
 *
 * Usage: bun from-json-cms/validate-keys.ts
 *
 * Checks:
 * - Whether specified keys exist in all records
 * - Whether key combinations are actually unique
 * - Whether there are null values in key fields
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_PATH = path.resolve(__dirname, 'data.json')
const KEYS_PATH = path.resolve(__dirname, 'unique-keys.json')

type UniqueKeysConfig = Record<string, string[] | null>

type ValidationResult = {
  collection: string
  totalRecords: number
  uniqueKeys: string[] | null
  issues: string[]
  isValid: boolean
}

function getKeyValue(record: Record<string, unknown>, keys: string[]): string {
  return keys.map((k) => JSON.stringify(record[k] ?? null)).join('|')
}

function validateCollection(
  name: string,
  records: Record<string, unknown>[],
  keys: string[] | null
): ValidationResult {
  const issues: string[] = []

  if (!keys) {
    return {
      collection: name,
      totalRecords: records.length,
      uniqueKeys: null,
      issues: ['No unique key defined (will always create new records)'],
      isValid: false,
    }
  }

  // Check if keys exist in all records
  for (const key of keys) {
    const missingCount = records.filter((r) => !(key in r)).length
    if (missingCount > 0) {
      issues.push(`Key "${key}" missing in ${missingCount} records`)
    }
  }

  // Check for null values in key fields
  for (const key of keys) {
    const nullCount = records.filter((r) => r[key] === null || r[key] === undefined).length
    if (nullCount > 0) {
      issues.push(`Key "${key}" is null in ${nullCount} records`)
    }
  }

  // Check uniqueness
  const keyValues = new Map<string, number>()
  for (const record of records) {
    const keyValue = getKeyValue(record, keys)
    keyValues.set(keyValue, (keyValues.get(keyValue) || 0) + 1)
  }

  const duplicates = [...keyValues.entries()].filter(([, count]) => count > 1)
  if (duplicates.length > 0) {
    issues.push(`${duplicates.length} duplicate key combinations found`)
    for (const [keyValue, count] of duplicates.slice(0, 3)) {
      issues.push(`  - ${keyValue}: ${count} records`)
    }
    if (duplicates.length > 3) {
      issues.push(`  ... and ${duplicates.length - 3} more`)
    }
  }

  return {
    collection: name,
    totalRecords: records.length,
    uniqueKeys: keys,
    issues,
    isValid: issues.length === 0,
  }
}

function main() {
  console.log('=== Unique Keys Validator ===\n')

  if (!fs.existsSync(DATA_PATH)) {
    console.error('Error: data.json not found. Run fetch-data.ts first.')
    process.exit(1)
  }

  if (!fs.existsSync(KEYS_PATH)) {
    console.error('Error: unique-keys.json not found.')
    process.exit(1)
  }

  const data: Record<string, Record<string, unknown>[]> = JSON.parse(
    fs.readFileSync(DATA_PATH, 'utf-8')
  )
  const keysConfig: UniqueKeysConfig = JSON.parse(fs.readFileSync(KEYS_PATH, 'utf-8'))

  const results: ValidationResult[] = []

  for (const [name, records] of Object.entries(data)) {
    if (name === '$schema') continue
    if (!Array.isArray(records)) continue

    const keys = keysConfig[name]
    if (keys === undefined) {
      results.push({
        collection: name,
        totalRecords: records.length,
        uniqueKeys: null,
        issues: ['Collection not defined in unique-keys.json'],
        isValid: false,
      })
      continue
    }

    results.push(validateCollection(name, records, keys))
  }

  // Print results
  let validCount = 0
  let invalidCount = 0

  for (const result of results) {
    const status = result.isValid ? '✓' : '✗'
    const keysStr = result.uniqueKeys ? result.uniqueKeys.join(' + ') : 'none'

    console.log(`${status} ${result.collection} (${result.totalRecords} records)`)
    console.log(`  Keys: ${keysStr}`)

    if (result.issues.length > 0) {
      for (const issue of result.issues) {
        console.log(`  ⚠ ${issue}`)
      }
    }

    if (result.isValid) {
      validCount++
    } else {
      invalidCount++
    }

    console.log()
  }

  console.log('=== Summary ===')
  console.log(`Valid: ${validCount}`)
  console.log(`Invalid: ${invalidCount}`)
  console.log(`Total: ${results.length}`)

  if (invalidCount > 0) {
    console.log('\n⚠ Some collections have issues. Update unique-keys.json or fix the data.')
    process.exit(1)
  } else {
    console.log('\n✓ All collections have valid unique keys.')
    process.exit(0)
  }
}

main()

export {}
