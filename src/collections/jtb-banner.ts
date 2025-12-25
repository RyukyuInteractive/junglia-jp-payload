import type { CollectionConfig } from 'payload'

export const JtbBanner: CollectionConfig = {
  slug: 'jtb-banner',
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
    },
    {
      name: 'url',
      type: 'text',
    },
  ],
}
