import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      name: 'path',
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
      name: 'ogp_image_url',
      type: 'text',
      required: false,
    },
    {
      name: 'ogp_image_url_en',
      type: 'text',
      required: false,
    },
    {
      name: 'ogp_image_url_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'ogp_image_url_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'ogp_image_url_tw',
      type: 'text',
      required: false,
    },
  ],
}
