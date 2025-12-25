import type { CollectionConfig } from 'payload'

export const ImportantNews: CollectionConfig = {
  slug: 'important-news',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
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
