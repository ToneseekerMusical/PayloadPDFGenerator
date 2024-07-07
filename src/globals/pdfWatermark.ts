import { GlobalConfig } from 'payload/types';
import { CollectionFieldList } from '../types';
import { pdfImage } from '../blocks/image';
import { pdfText } from '../blocks/text';

export function PDFWatermark(relationTo: string, collectionConfig: CollectionFieldList){
  const PDFWatermarks: GlobalConfig = {
    slug: 'pdf-watermarks',
    admin: {
      group: "PDF Globals"
    },
    fields: [
      {
        name: 'watermark',
        type: 'blocks',
        blocks: [
          pdfImage(relationTo),
          pdfText(collectionConfig)
        ],
        minRows: 1,
        required: true
      }
    ],
  }
  return PDFWatermarks
}