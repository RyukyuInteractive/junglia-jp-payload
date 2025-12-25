import type { CollectionConfig } from 'payload'

export const CalendarRestaurant: CollectionConfig = {
  slug: 'calendar-restaurant',
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
      name: 'date',
      type: 'text',
    },
    {
      name: 'panorama_dining_opens_at',
      type: 'text',
    },
    {
      name: 'panorama_dining_closes_at',
      type: 'text',
    },
    {
      name: 'panorama_dining_custom',
      type: 'text',
      required: false,
    },
    {
      name: 'wild_banquet_opens_at',
      type: 'text',
    },
    {
      name: 'wild_banquet_closes_at',
      type: 'text',
    },
    {
      name: 'wild_banquet_custom',
      type: 'text',
      required: false,
    },
    {
      name: 'sunset_beer_terrace_opens_at',
      type: 'text',
    },
    {
      name: 'sunset_beer_terrace_closes_at',
      type: 'text',
    },
    {
      name: 'sunset_beer_terrace_custom',
      type: 'text',
      required: false,
    },
    {
      name: 'tropical_oasis_opens_at',
      type: 'text',
    },
    {
      name: 'tropical_oasis_closes_at',
      type: 'text',
    },
    {
      name: 'tropical_oasis_custom',
      type: 'text',
      required: false,
    },
  ],
}
