import type { CollectionConfig } from 'payload'

export const ExperienceAgreement: CollectionConfig = {
  slug: 'experience-agreement',
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
      name: 'name',
      type: 'text',
    },
    {
      name: 'id',
      type: 'text',
    },
    {
      name: 'attraction_slug',
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
      name: 'body',
      type: 'text',
      required: false,
    },
    {
      name: 'body_en',
      type: 'text',
      required: false,
    },
    {
      name: 'body_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'body_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'body_tw',
      type: 'text',
      required: false,
    },
  ],
}
