import { GlobalConfig } from 'payload/types';

const PDFFooter: GlobalConfig = {
  slug: 'pdf-footer',
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

export default PDFFooter
