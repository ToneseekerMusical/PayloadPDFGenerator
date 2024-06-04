import { GlobalConfig } from 'payload/types';

const PDFWatermark: GlobalConfig = {
  slug: 'pdf-watermark',
  admin: {
    group: "PDF Globals"
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}

export default PDFWatermark
