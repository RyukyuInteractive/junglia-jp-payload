import type { CollectionConfig } from 'payload'

export const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'is_disabled',
      type: 'checkbox',
    },
    {
      name: 'area',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'name_kana',
      type: 'text',
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
      name: 'reservation_url',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_url_en',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_url_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_url_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_url_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'business_start_time',
      type: 'text',
    },
    {
      name: 'business_end_time',
      type: 'text',
    },
    {
      name: 'image_url',
      type: 'text',
    },
    {
      name: 'image_url_small',
      type: 'text',
    },
    {
      name: 'image_url_main',
      type: 'text',
      required: false,
    },
  ],
}
