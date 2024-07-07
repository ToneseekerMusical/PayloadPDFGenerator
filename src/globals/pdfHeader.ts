import { GlobalConfig, SelectField } from 'payload/types';
import { pdfImage } from '../blocks/image';
import { CollectionFieldList } from '../types';
import { pdfHeaderSection } from '../blocks/headerSection';
import { pdfHeaderPath } from '../blocks/headerPath';
import { pdfHeaderText } from '../blocks/headerText';
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import { pdfText } from '../blocks/text';

export function PDFHeader(relationTo: string, collectionFields: CollectionFieldList){
  const PDFHeaders: GlobalConfig = {
    slug: 'pdf-header',
    admin: {
      group: "PDF Globals"
    },
    fields: [
      {
        name: 'layouts',
        type: 'array',
        admin: {
          initCollapsed: true,
          components: {
            RowLabel: ({data, index}: RowLabelArgs)=> {
              return data?.layoutName || `Layout ${String(index).padStart(2,'0')}`
            }
          },
        },
        fields: [
          {
            name: 'layoutName',
            type: 'text',
            required: true
          },
          {
            name: 'layout',
            type: 'blocks',
            admin: {
              initCollapsed: true
            },
            blocks: [
              pdfHeaderSection,
              pdfImage(relationTo),
              pdfHeaderPath,
              pdfText()
            ]
          }
        ]
      },
    ],
  }
  return PDFHeaders
}
