/**
 * Fetch latest data and schema from JSON API
 *
 * Required environment variables:
 *   JSON_API_URL - API endpoint URL
 *   JSON_API_KEY - API authentication key
 */

const apiUrl = process.env.JSON_API_URL
const apiKey = process.env.JSON_API_KEY

if (!apiUrl || !apiKey) {
  console.error('Error: JSON_API_URL and JSON_API_KEY environment variables are required')
  process.exit(1)
}

console.log('Fetching data from API...')

// Fetch schema
{
  console.log('  Fetching schema.json...')
  const resp = await fetch(`${apiUrl}/schema.json`, {
    headers: { authorization: `Bearer ${apiKey}` },
  })

  if (!resp.ok) {
    console.error(`Failed to fetch schema: ${resp.status} ${resp.statusText}`)
    process.exit(1)
  }

  const data = await resp.json()
  const json = JSON.stringify(data, null, 2)

  await Bun.write('./from-json-cms/data.schema.json', json)
  console.log('  Saved: data.schema.json')
}

// Fetch data
{
  console.log('  Fetching data.json...')
  const resp = await fetch(apiUrl, {
    headers: { authorization: `Bearer ${apiKey}` },
  })

  if (!resp.ok) {
    console.error(`Failed to fetch data: ${resp.status} ${resp.statusText}`)
    process.exit(1)
  }

  const data = await resp.json()
  const json = JSON.stringify(data, null, 2)

  await Bun.write('./from-json-cms/data.json', json)
  console.log('  Saved: data.json')
}

console.log('Done!')

export {}
