import type { CollectionConfig } from 'payload'

export const TicketNotes: CollectionConfig = {
  slug: 'ticket-notes',
  admin: {
    useAsTitle: 'is_disabled_ticket',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'is_disabled_ticket',
      type: 'checkbox',
    },
    {
      name: 'is_disabled_spa',
      type: 'checkbox',
    },
    {
      name: 'is_disabled_resident',
      type: 'checkbox',
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
