import type { CollectionConfig } from 'payload'

export const SpaServiceGuide: CollectionConfig = {
  slug: 'spa-service-guide',
  admin: {
    useAsTitle: 'title',
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
      name: 'category',
      type: 'text',
    },
    {
      name: 'category_id',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'title_en',
      type: 'text',
      required: false,
    },
    {
      name: 'title_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'title_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'title_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'title_id',
      type: 'text',
      required: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'subtitle_en',
      type: 'text',
      required: false,
    },
    {
      name: 'subtitle_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'subtitle_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'subtitle_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'body',
      type: 'text',
    },
    {
      name: 'body_en',
      type: 'text',
    },
    {
      name: 'body_ko',
      type: 'text',
    },
    {
      name: 'body_cn',
      type: 'text',
    },
    {
      name: 'body_tw',
      type: 'text',
    },
  ],
}
