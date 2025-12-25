import type { CollectionConfig } from 'payload'

export const PremiumPassNotes: CollectionConfig = {
  slug: 'premium-pass-notes',
  admin: {
    useAsTitle: 'is_disabled',
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
      name: 'text',
      type: 'text',
      required: false,
    },
    {
      name: 'text_en',
      type: 'text',
      required: false,
    },
    {
      name: 'text_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'text_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'text_tw',
      type: 'text',
      required: false,
    },
  ],
}
