import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import { GlobalConfig } from 'payload/types';

export function PDFFonts(relationTo: string) {
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
            relationTo: `${relationTo}`,
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
        ]
      }
    ],
  }
  return PDFFonts
}
