import type { CollectionConfig } from 'payload'

export const Crowdedness: CollectionConfig = {
  slug: 'crowdedness',
  admin: {
    useAsTitle: 'mens_bath',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mens_bath',
      type: 'text',
      required: false,
    },
    {
      name: 'womens_bath',
      type: 'text',
      required: false,
    },
  ],
}
