import type { CollectionConfig } from 'payload'

export const TimetableTimes: CollectionConfig = {
  slug: 'timetable-times',
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
      name: 'time_name',
      type: 'text',
      required: false,
    },
    {
      name: 'table_id',
      type: 'text',
    },
    {
      name: 'row_index',
      type: 'number',
      required: false,
    },
    {
      name: 'col1_value',
      type: 'text',
      required: false,
    },
    {
      name: 'col2_value',
      type: 'text',
      required: false,
    },
    {
      name: 'col3_value',
      type: 'text',
      required: false,
    },
    {
      name: 'col_is_red',
      type: 'checkbox',
    },
    {
      name: 'col_symbols',
      type: 'text',
      required: false,
    },
  ],
}
