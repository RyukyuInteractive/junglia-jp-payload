import type { CollectionConfig } from 'payload'

export const OtaBanners: CollectionConfig = {
  slug: 'ota-banners',
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
      name: 'language',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'image_url',
      type: 'text',
    },
    {
      name: 'image_alt',
      type: 'text',
    },
    {
      name: 'event',
      type: 'text',
    },
  ],
}
