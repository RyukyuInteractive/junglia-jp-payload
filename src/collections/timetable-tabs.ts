import type { CollectionConfig } from 'payload'

export const TimetableTabs: CollectionConfig = {
  slug: 'timetable-tabs',
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
      name: 'tab_id',
      type: 'text',
    },
    {
      name: 'route_id',
      type: 'text',
    },
    {
      name: 'is_show_anchor_links',
      type: 'checkbox',
    },
    {
      name: 'tab_title',
      type: 'text',
      required: false,
    },
    {
      name: 'tab_title_en',
      type: 'text',
      required: false,
    },
    {
      name: 'tab_title_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'tab_title_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'tab_title_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_notes',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_notes_en',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_notes_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_notes_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'reservation_notes_tw',
      type: 'text',
      required: false,
    },
  ],
}
