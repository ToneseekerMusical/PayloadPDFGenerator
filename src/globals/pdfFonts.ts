import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import { GlobalConfig } from 'payload/types';
import { toBase64 } from '../utils/base64Conversion';

const PDFFonts: GlobalConfig = {
  slug: 'pdf-fonts',
  admin: {
    group: "PDF Globals"
  },
  fields: [
    {
      name: 'fontList',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.fontName || `Font ${String(index).padStart(2, '0')}`
          }
        },
        initCollapsed: true
      },
      fields: [
        {
          name: 'fontFile',
          type: 'upload',
          relationTo: 'media',
          filterOptions: {
            mimeType: {contains: 'application/octet-stream'}
          },
        },
        {
          name: 'fontName',
          type: 'text'
        },
        {
          name: 'fontWeight',
          type: 'select',
          options: [
            {label: 'Bold', value: 'bold'},
            {label: 'Italic', value: 'italic'},
            {label: 'Normal', value: 'normal'},
            {label: 'Bold Italic', value: 'bolditalic'},
          ]
        },
        {
          name: 'base64String',
          type: 'text',
          hooks: {
            afterChange: [({value, previousValue, siblingData, req}) => {
              value = value === '' ? toBase64(siblingData.fontFile) : value
            }]
          }
        }
      ]
    }
  ],
}

export default PDFFonts
