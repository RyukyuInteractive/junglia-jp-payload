import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'slug',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'is_disabled',
      type: 'checkbox',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'area',
      type: 'text',
      required: false,
    },
    {
      name: 'image_url',
      type: 'text',
      required: false,
    },
    {
      name: 'flutter_map_position_top',
      type: 'number',
      required: false,
    },
    {
      name: 'flutter_map_position_left',
      type: 'number',
      required: false,
    },
    {
      name: 'map_coords_mobile',
      type: 'text',
      required: false,
    },
    {
      name: 'map_coords',
      type: 'text',
      required: false,
    },
  ],
}
