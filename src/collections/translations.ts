import type { CollectionConfig } from 'payload'

export const Translations: CollectionConfig = {
  slug: 'translations',
  admin: {
    useAsTitle: 'path',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'is_disabled',
      type: 'checkbox',
    },
    {
      name: 'path',
      type: 'text',
    },
    {
      name: 'key',
      type: 'text',
      required: false,
    },
    {
      name: 'ja',
      type: 'text',
    },
    {
      name: 'en',
      type: 'text',
    },
    {
      name: 'ko',
      type: 'text',
    },
    {
      name: 'cn',
      type: 'text',
    },
    {
      name: 'tw',
      type: 'text',
    },
  ],
}
