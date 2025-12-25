import type { CollectionConfig } from 'payload'

export const Shops: CollectionConfig = {
  slug: 'shops',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name_kana',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'is_disabled',
      type: 'checkbox',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'area',
      type: 'text',
      required: false,
    },
    {
      name: 'tagline',
      type: 'text',
      required: false,
    },
    {
      name: 'tagline_en',
      type: 'text',
      required: false,
    },
    {
      name: 'tagline_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'tagline_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'tagline_tw',
      type: 'text',
      required: false,
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
      name: 'image_url',
      type: 'text',
      required: false,
    },
  ],
}
