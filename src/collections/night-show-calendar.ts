import type { CollectionConfig } from 'payload'

export const NightShowCalendar: CollectionConfig = {
  slug: 'night-show-calendar',
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
      name: 'junglia_hanabi_start_time',
      type: 'text',
      required: false,
    },
    {
      name: 'junglia_hanabi_custom',
      type: 'text',
      required: false,
    },
    {
      name: 'junglia_night_fes_start_time',
      type: 'text',
      required: false,
    },
    {
      name: 'junglia_night_fes_custom',
      type: 'text',
      required: false,
    },
  ],
}
