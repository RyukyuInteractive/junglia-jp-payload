import type { CollectionConfig } from 'payload'

export const Attractions: CollectionConfig = {
  slug: 'attractions',
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
      name: 'name',
      type: 'text',
    },
    {
      name: 'name_kana',
      type: 'text',
    },
    {
      name: 'category',
      type: 'text',
      required: false,
    },
    {
      name: 'area',
      type: 'text',
      required: false,
    },
    {
      name: 'type',
      type: 'text',
      required: false,
    },
    {
      name: 'premium_pass',
      type: 'text',
      required: false,
    },
    {
      name: 'photo_service',
      type: 'checkbox',
    },
    {
      name: 'is_limit_disabled',
      type: 'checkbox',
    },
    {
      name: 'limit_title',
      type: 'text',
      required: false,
    },
    {
      name: 'limit_text_field',
      type: 'text',
      required: false,
    },
    {
      name: 'limit_age_min',
      type: 'number',
      required: false,
    },
    {
      name: 'limit_passenger_age_min',
      type: 'number',
      required: false,
    },
    {
      name: 'limit_weight_min',
      type: 'number',
      required: false,
    },
    {
      name: 'limit_weight_max',
      type: 'number',
      required: false,
    },
    {
      name: 'limit_height_min',
      type: 'number',
      required: false,
    },
    {
      name: 'accompanied_age',
      type: 'number',
      required: false,
    },
    {
      name: 'parental_consent',
      type: 'checkbox',
    },
    {
      name: 'driving_license',
      type: 'checkbox',
    },
    {
      name: 'restricted_users',
      type: 'text',
      required: false,
    },
    {
      name: 'restricted_users_en',
      type: 'text',
      required: false,
    },
    {
      name: 'restricted_users_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'restricted_users_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'restricted_users_tw',
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
      name: 'ticket_premium_pass',
      type: 'text',
      required: false,
    },
    {
      name: 'ticket_same_day',
      type: 'text',
      required: false,
    },
    {
      name: 'disclaimer',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_small',
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
    {
      name: 'ogp_image_url',
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
      name: 'limit_old_age',
      type: 'checkbox',
    },
    {
      name: 'callout',
      type: 'text',
      required: false,
    },
    {
      name: 'callout_en',
      type: 'text',
      required: false,
    },
    {
      name: 'callout_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'callout_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'callout_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'youtube_id',
      type: 'text',
      required: false,
    },
  ],
}
