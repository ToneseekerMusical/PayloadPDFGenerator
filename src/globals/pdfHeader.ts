import { GlobalConfig } from 'payload/types';

const PDFHeader: GlobalConfig = {
  slug: 'pdf-header',
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

export default PDFHeader
