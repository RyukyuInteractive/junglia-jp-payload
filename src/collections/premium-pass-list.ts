import type { CollectionConfig } from 'payload'

export const PremiumPassList: CollectionConfig = {
  slug: 'premium-pass-list',
  admin: {
    useAsTitle: 'attractions',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'attractions',
      type: 'text',
    },
    {
      name: 'price',
      type: 'text',
    },
    {
      name: 'image_url',
      type: 'text',
    },
  ],
}
