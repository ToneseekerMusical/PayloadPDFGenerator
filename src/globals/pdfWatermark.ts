import { GlobalConfig } from 'payload/types';
import { pdfImageSize } from '../fields/pdfImageSize';

export function PDFWatermark(relationTo: string){
  const PDFWatermarks: GlobalConfig = {
    slug: 'pdf-watermarks',
    admin: {
      group: "PDF Globals"
    },
    fields: [
      {
        name: 'watermarks',
        type: 'array',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'watermark',
                type: 'upload',
                relationTo: `${relationTo}`
              },
              ...pdfImageSize
            ]
          }
        ]
      }
    ],
  }
  return PDFWatermarks
}