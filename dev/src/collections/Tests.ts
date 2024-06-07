import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Tests: CollectionConfig = {
  slug: 'tests',
  admin: {
    useAsTitle: 'someField',
  },
  fields: [
    {
      name: 'someField',
      type: 'text',
    },
    {
      name: 'array',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text'
        },
        {
          name: 'textArea',
          type: 'textarea'
        },
        {
          name: 'richText',
          type: 'richText'
        }
      ]
    },
    {
      name: 'group',
      type: 'group',
      fields: [
        {
          name: 'date',
          type: 'date'
        },
        {
          name: 'email',
          type: 'email'
        },
        {
          name: 'points',
          type: 'point'
        },
      ]
    }
  ],
}

export default Tests;