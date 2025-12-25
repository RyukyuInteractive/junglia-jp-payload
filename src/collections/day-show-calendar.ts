import type { CollectionConfig } from 'payload'

export const DayShowCalendar: CollectionConfig = {
  slug: 'day-show-calendar',
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
      name: 'junglia_splash_fes_start_time',
      type: 'text',
      required: false,
    },
    {
      name: 'junglia_splash_fes_custom',
      type: 'text',
      required: false,
    },
  ],
}
