import type { CollectionConfig } from 'payload'

export const ComfortNaviPhotoList: CollectionConfig = {
  slug: 'comfort-navi-photo-list',
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
      required: false,
    },
  ],
}
