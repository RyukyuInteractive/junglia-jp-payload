import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'text',
    },
    {
      name: 'date',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'title_en',
      type: 'text',
    },
    {
      name: 'title_ko',
      type: 'text',
    },
    {
      name: 'title_cn',
      type: 'text',
    },
    {
      name: 'title_tw',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'url_en',
      type: 'text',
    },
    {
      name: 'url_ko',
      type: 'text',
    },
    {
      name: 'url_cn',
      type: 'text',
    },
    {
      name: 'url_tw',
      type: 'text',
    },
  ],
}
