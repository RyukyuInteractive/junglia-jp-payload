import type { CollectionConfig } from 'payload'

export const Topics: CollectionConfig = {
  slug: 'topics',
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
      name: 'note',
      type: 'text',
      required: false,
    },
    {
      name: 'note_en',
      type: 'text',
      required: false,
    },
    {
      name: 'note_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'note_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'note_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'url',
      type: 'text',
      required: false,
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
    {
      name: 'image_url_en',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url_tw',
      type: 'text',
      required: false,
    },
  ],
}
