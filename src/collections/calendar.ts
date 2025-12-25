import type { CollectionConfig } from 'payload'

export const Calendar: CollectionConfig = {
  slug: 'calendar',
  admin: {
    useAsTitle: 'id_disabled',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id_disabled',
      type: 'checkbox',
    },
    {
      name: 'date',
      type: 'text',
    },
    {
      name: 'park_start_time',
      type: 'text',
      required: false,
    },
    {
      name: 'park_end_time',
      type: 'text',
      required: false,
    },
    {
      name: 'spa_start_time',
      type: 'text',
      required: false,
    },
    {
      name: 'spa_end_time',
      type: 'text',
      required: false,
    },
    {
      name: 'restaurant_closes_at',
      type: 'text',
      required: false,
    },
    {
      name: 'is_restaurant_notes',
      type: 'checkbox',
    },
  ],
}
