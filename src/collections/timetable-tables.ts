import type { CollectionConfig } from 'payload'

export const TimetableTables: CollectionConfig = {
  slug: 'timetable-tables',
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
      name: 'table_name',
      type: 'text',
      required: false,
    },
    {
      name: 'table_id',
      type: 'text',
    },
    {
      name: 'tab_id',
      type: 'text',
    },
    {
      name: 'table_title_id',
      type: 'text',
    },
    {
      name: 'table_title',
      type: 'text',
      required: false,
    },
    {
      name: 'table_title_en',
      type: 'text',
      required: false,
    },
    {
      name: 'table_title_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'table_title_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'table_title_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_1',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_1_en',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_1_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_1_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_1_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_1_use_space',
      type: 'checkbox',
    },
    {
      name: 'table_header_2',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_2_en',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_2_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_2_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_2_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_2_use_space',
      type: 'checkbox',
    },
    {
      name: 'table_header_3',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_3_en',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_3_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_3_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_3_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'table_header_3_use_space',
      type: 'checkbox',
    },
    {
      name: 'table_note',
      type: 'text',
      required: false,
    },
    {
      name: 'table_note_en',
      type: 'text',
      required: false,
    },
    {
      name: 'table_note_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'table_note_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'table_note_tw',
      type: 'text',
      required: false,
    },
    {
      name: 'table_note_is_red',
      type: 'checkbox',
    },
    {
      name: 'table_note_is_ordered',
      type: 'checkbox',
    },
  ],
}
