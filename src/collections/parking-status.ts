import type { CollectionConfig } from 'payload'

export const ParkingStatus: CollectionConfig = {
  slug: 'parking-status',
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
      name: 'id_disabled',
      type: 'checkbox',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'name_en',
      type: 'text',
    },
    {
      name: 'name_ko',
      type: 'text',
    },
    {
      name: 'name_cn',
      type: 'text',
    },
    {
      name: 'name_tw',
      type: 'text',
    },
    {
      name: 'name_description_text',
      type: 'text',
    },
    {
      name: 'name_description_text_en',
      type: 'text',
    },
    {
      name: 'name_description_text_ko',
      type: 'text',
    },
    {
      name: 'name_description_text_cn',
      type: 'text',
    },
    {
      name: 'name_description_text_tw',
      type: 'text',
    },
    {
      name: 'id',
      type: 'text',
    },
    {
      name: 'api_id',
      type: 'text',
    },
    {
      name: 'api_area_id',
      type: 'text',
    },
    {
      name: 'reservation_url',
      type: 'text',
    },
    {
      name: 'price',
      type: 'text',
    },
    {
      name: 'price_en',
      type: 'text',
    },
    {
      name: 'price_ko',
      type: 'text',
    },
    {
      name: 'price_cn',
      type: 'text',
    },
    {
      name: 'price_tw',
      type: 'text',
    },
    {
      name: 'price_label_free',
      type: 'checkbox',
    },
    {
      name: 'price_label_paid',
      type: 'checkbox',
    },
    {
      name: 'price_label_reserve',
      type: 'checkbox',
    },
    {
      name: 'time_to_park_min',
      type: 'number',
      required: false,
    },
    {
      name: 'note',
      type: 'text',
    },
    {
      name: 'note_en',
      type: 'text',
    },
    {
      name: 'note_ko',
      type: 'text',
    },
    {
      name: 'note_cn',
      type: 'text',
    },
    {
      name: 'note_tw',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'address_en',
      type: 'text',
    },
    {
      name: 'address_ko',
      type: 'text',
    },
    {
      name: 'address_cn',
      type: 'text',
    },
    {
      name: 'address_tw',
      type: 'text',
    },
    {
      name: 'start_time',
      type: 'text',
    },
    {
      name: 'end_time',
      type: 'text',
    },
    {
      name: 'map_url',
      type: 'text',
    },
    {
      name: 'map_url_sc',
      type: 'text',
    },
    {
      name: 'map_pin_bubble_side',
      type: 'text',
    },
    {
      name: 'iframe_map_url',
      type: 'text',
    },
    {
      name: 'map_coords_mobile',
      type: 'text',
    },
    {
      name: 'map_coords',
      type: 'text',
    },
  ],
}
