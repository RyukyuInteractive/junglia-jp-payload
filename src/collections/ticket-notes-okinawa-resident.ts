import type { CollectionConfig } from 'payload'

export const TicketNotesOkinawaResident: CollectionConfig = {
  slug: 'ticket-notes-okinawa-resident',
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
      name: 'type',
      type: 'text',
      required: false,
    },
    {
      name: 'type_name',
      type: 'text',
      required: false,
    },
    {
      name: 'text',
      type: 'text',
      required: false,
    },
    {
      name: 'text_en',
      type: 'text',
      required: false,
    },
    {
      name: 'text_ko',
      type: 'text',
      required: false,
    },
    {
      name: 'text_cn',
      type: 'text',
      required: false,
    },
    {
      name: 'text_tw',
      type: 'text',
      required: false,
    },
  ],
}
