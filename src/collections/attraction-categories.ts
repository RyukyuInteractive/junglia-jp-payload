import type { CollectionConfig } from 'payload'

export const AttractionCategories: CollectionConfig = {
  slug: 'attraction-categories',
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
      name: 'category',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
      required: false,
    },
  ],
}
