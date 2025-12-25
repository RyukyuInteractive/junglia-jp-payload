import type { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  admin: {
    useAsTitle: 'name',
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
    },
    {
      name: 'price_ex_tax',
      type: 'text',
    },
    {
      name: 'price_ex_tax_en',
      type: 'text',
    },
    {
      name: 'price_ex_tax_ko',
      type: 'text',
    },
    {
      name: 'price_ex_tax_cn',
      type: 'text',
    },
    {
      name: 'price_ex_tax_tw',
      type: 'text',
    },
    {
      name: 'price_inc_tax',
      type: 'text',
    },
    {
      name: 'price_inc_tax_en',
      type: 'text',
    },
    {
      name: 'price_inc_tax_ko',
      type: 'text',
    },
    {
      name: 'price_inc_tax_cn',
      type: 'text',
    },
    {
      name: 'price_inc_tax_tw',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
}
