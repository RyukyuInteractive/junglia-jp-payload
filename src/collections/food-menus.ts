import type { CollectionConfig } from 'payload'

export const FoodMenus: CollectionConfig = {
  slug: 'food-menus',
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
      name: 'restaurant_slug',
      type: 'text',
    },
    {
      name: 'category',
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
      name: 'details_title',
      type: 'text',
      required: false,
    },
    {
      name: 'details_title_en',
      type: 'text',
      required: false,
    },
    {
      name: 'details_title_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'details_title_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'details_title_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'details_body',
      type: 'text',
      required: false,
    },
    {
      name: 'details_body_en',
      type: 'text',
      required: false,
    },
    {
      name: 'details_body_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'details_body_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'details_body_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'notes',
      type: 'text',
      required: false,
    },
    {
      name: 'notes_en',
      type: 'text',
      required: false,
    },
    {
      name: 'notes_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'notes_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'notes_tw',
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
