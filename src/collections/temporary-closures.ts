import type { CollectionConfig } from 'payload'

export const TemporaryClosures: CollectionConfig = {
  slug: 'temporary-closures',
  admin: {
    useAsTitle: 'attraction',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'attraction',
      type: 'text',
    },
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'text_en',
      type: 'text',
    },
    {
      name: 'text_ko',
      type: 'text',
    },
    {
      name: 'text_cn',
      type: 'text',
    },
    {
      name: 'text_tw',
      type: 'text',
    },
  ],
}
