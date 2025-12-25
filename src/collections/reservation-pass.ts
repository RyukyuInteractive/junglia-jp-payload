import type { CollectionConfig } from 'payload'

export const ReservationPass: CollectionConfig = {
  slug: 'reservation-pass',
  admin: {
    useAsTitle: 'id',
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
      name: 'id',
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
