import type { CollectionConfig } from 'payload'

export const GoodsCategories: CollectionConfig = {
  slug: 'goods-categories',
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
  ],
}
