import type { CollectionConfig } from 'payload'

export const Goods: CollectionConfig = {
  slug: 'goods',
  admin: {
    useAsTitle: 'name',
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
      name: 'is_new',
      type: 'checkbox',
    },
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
      name: 'slug',
      type: 'text',
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'shop',
      type: 'text',
      required: false,
    },
    {
      name: 'attractions',
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
      name: 'type',
      type: 'text',
      required: false,
    },
    {
      name: 'type_en',
      type: 'text',
      required: false,
    },
    {
      name: 'type_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'type_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'type_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'release_date',
      type: 'text',
      required: false,
    },
    {
      name: 'release_date_en',
      type: 'text',
      required: false,
    },
    {
      name: 'release_date_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'release_date_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'release_date_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'price_ex_tax',
      type: 'number',
      required: false,
    },
    {
      name: 'price_in_tax',
      type: 'number',
      required: false,
    },
    {
      name: 'main_image_url',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_1',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_2',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_3',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_4',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_5',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_6',
      type: 'text',
      required: false,
    },
  ],
}
