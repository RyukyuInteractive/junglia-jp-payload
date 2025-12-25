import type { CollectionConfig } from 'payload'

export const Hotels: CollectionConfig = {
  slug: 'hotels',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'name_en',
      type: 'text',
    },
    {
      name: 'name_ko',
      type: 'text',
    },
    {
      name: 'name_cn',
      type: 'text',
    },
    {
      name: 'name_tw',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
      required: false,
    },
    {
      name: 'description_en',
      type: 'text',
      required: false,
    },
    {
      name: 'description_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'description_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'description_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'url_en',
      type: 'text',
      required: false,
    },
    {
      name: 'url_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'url_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'url_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url',
      type: 'text',
      required: false,
    },
  ],
}
