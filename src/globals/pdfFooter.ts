import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import { GlobalConfig } from 'payload/types';
import { PDFFooterFields } from '../fields/pdfFooterFields';

export function PDFFooter(relationTo: string){
  const pdfFooter: GlobalConfig = {
    slug: 'pdf-footer',
    admin: {
      group: "PDF Globals"
    },
    fields: [
      {
        name: 'footerLayout',
        type: 'array',
        admin: {
          components: {
            RowLabel: ({data, index}: RowLabelArgs)=> {
              return data?.layoutName || `Layout ${String(index).padStart(2,'0')}`
            }
          },
          initCollapsed: true
        },
        fields: [
          {
            name: 'layoutName',
            type: 'text',
            required: true
          },
          ...PDFFooterFields(relationTo)
        ]
      }
    ],
  }
  return pdfFooter
}