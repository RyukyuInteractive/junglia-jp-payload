/**
 * Generate Payload Collection definitions from JSON Schema
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface JsonSchemaProperty {
  type?: string | string[]
  anyOf?: Array<{ type: string }>
}

interface JsonSchemaObject {
  type: string
  properties: Record<string, JsonSchemaProperty>
  required?: string[]
}

interface JsonSchema {
  properties: Record<string, { type: string; items?: JsonSchemaObject }>
}

const SCHEMA_PATH = path.resolve(__dirname, 'data.schema.json')
const COLLECTIONS_DIR = path.resolve(__dirname, '../src/collections')

// Skip these collections
const SKIP_COLLECTIONS = ['$schema']

function toPascalCase(str: string): string {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function toKebabCase(str: string): string {
  return str.replace(/_/g, '-')
}

function getPayloadFieldType(prop: JsonSchemaProperty): { type: string; required: boolean } {
  let fieldType = 'text'
  let required = true

  // Handle anyOf (nullable types)
  if (prop.anyOf) {
    const types = prop.anyOf.map((t) => t.type).filter((t) => t !== 'null')
    required = !prop.anyOf.some((t) => t.type === 'null')
    if (types.includes('number')) {
      fieldType = 'number'
    } else if (types.includes('boolean')) {
      fieldType = 'checkbox'
    } else {
      fieldType = 'text'
    }
  } else if (prop.type) {
    const type = Array.isArray(prop.type) ? prop.type[0] : prop.type
    switch (type) {
      case 'number':
        fieldType = 'number'
        break
      case 'boolean':
        fieldType = 'checkbox'
        break
      case 'string':
      default:
        fieldType = 'text'
        break
    }
  }

  return { type: fieldType, required }
}

function generateFieldDefinition(name: string, prop: JsonSchemaProperty): string {
  const { type, required } = getPayloadFieldType(prop)

  const fieldLines = [`    {`, `      name: '${name}',`, `      type: '${type}',`]

  if (!required) {
    fieldLines.push(`      required: false,`)
  }

  fieldLines.push(`    },`)

  return fieldLines.join('\n')
}

function generateCollectionFile(name: string, schema: JsonSchemaObject): string {
  const pascalName = toPascalCase(name)
  const kebabSlug = toKebabCase(name)

  const fields = Object.entries(schema.properties)
    .map(([fieldName, fieldSchema]) => generateFieldDefinition(fieldName, fieldSchema))
    .join('\n')

  return `import type { CollectionConfig } from 'payload'

export const ${pascalName}: CollectionConfig = {
  slug: '${kebabSlug}',
  admin: {
    useAsTitle: '${getUsableTitle(schema.properties)}',
  },
  access: {
    read: () => true,
  },
  fields: [
${fields}
  ],
}
`
}

function getUsableTitle(properties: Record<string, JsonSchemaProperty>): string {
  // Prefer these fields as title in order
  const preferredTitles = ['name', 'title', 'slug', 'id', 'path', 'category']
  for (const title of preferredTitles) {
    if (properties[title]) {
      return title
    }
  }
  return Object.keys(properties)[0] || 'id'
}

async function generateCollections() {
  console.log('Reading schema...')
  const rawSchema = fs.readFileSync(SCHEMA_PATH, 'utf-8')
  const schema: JsonSchema = JSON.parse(rawSchema)

  // Ensure collections directory exists
  if (!fs.existsSync(COLLECTIONS_DIR)) {
    fs.mkdirSync(COLLECTIONS_DIR, { recursive: true })
  }

  const generatedCollections: string[] = []

  for (const [collectionName, collectionSchema] of Object.entries(schema.properties)) {
    if (SKIP_COLLECTIONS.includes(collectionName)) {
      continue
    }

    if (collectionSchema.type !== 'array' || !collectionSchema.items) {
      console.log(`Skipping ${collectionName}: not an array type`)
      continue
    }

    const kebabName = toKebabCase(collectionName)
    const fileName = `${kebabName}.ts`
    const filePath = path.join(COLLECTIONS_DIR, fileName)

    const content = generateCollectionFile(collectionName, collectionSchema.items)

    fs.writeFileSync(filePath, content)
    console.log(`Generated: ${fileName}`)
    generatedCollections.push(collectionName)
  }

  // Generate index file for easy imports
  const imports = generatedCollections
    .map((name) => {
      const kebabName = toKebabCase(name)
      const pascalName = toPascalCase(name)
      return `import { ${pascalName} } from './${kebabName}'`
    })
    .join('\n')

  const exports = generatedCollections.map((name) => toPascalCase(name)).join(',\n  ')

  const indexContent = `${imports}

export const collections = [
  ${exports},
]
`

  fs.writeFileSync(path.join(COLLECTIONS_DIR, 'index.generated.ts'), indexContent)
  console.log('\nGenerated: index.generated.ts')

  console.log('\n=== Summary ===')
  console.log(`Generated ${generatedCollections.length} collection files`)
  console.log('\nAdd to payload.config.ts:')
  console.log("import { collections as generatedCollections } from './collections/index.generated'")
  console.log('\ncollections: [Users, Media, ...generatedCollections]')
}

generateCollections().catch(console.error)
