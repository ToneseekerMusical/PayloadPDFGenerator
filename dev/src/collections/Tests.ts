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
      name: 'sampleArray',
      type: 'array',
      fields: [
        {
          name: 'sampleText',
          type: 'text'
        },
        {
          name: 'sampleTextArea',
          type: 'textarea'
        },
        {
          name: 'sampleRichText',
          type: 'richText'
        }
      ]
    },
    {
      name: 'sampleGroup',
      type: 'group',
      fields: [
        {
          name: 'sampleDate',
          type: 'date'
        },
        {
          name: 'sampleEmail',
          type: 'email'
        },
        {
          name: 'samplePoints',
          type: 'point'
        },
      ]
    }
  ],
}

export default Tests;