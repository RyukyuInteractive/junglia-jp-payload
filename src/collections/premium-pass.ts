import type { CollectionConfig } from 'payload'

export const PremiumPass: CollectionConfig = {
  slug: 'premium-pass',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
    },
    {
      name: 'price_ex_tax',
      type: 'number',
    },
    {
      name: 'price_inc_tax',
      type: 'number',
    },
  ],
}
