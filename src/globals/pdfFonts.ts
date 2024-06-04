import { GlobalConfig } from 'payload/types';

const PDFFonts: GlobalConfig = {
  slug: 'pdf-fonts',
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

export default PDFFonts
