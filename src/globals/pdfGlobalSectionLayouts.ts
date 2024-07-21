import { GlobalConfig } from 'payload/types';
import { CollectionFieldList, PluginConfig } from '../types';
import { pdfHeaderLayout } from '../blocks/headerLayout';
import { pdfFooterLayout } from '../blocks/footerLayout';

export function PDFGlobalSectionLayouts(relationTo: string, collectionFields: CollectionFieldList, pluginOptions: PluginConfig){
  const PDFGlobalSectionLayouts: GlobalConfig = {
    slug: 'pdf-global-section-layouts',
    admin: {
      group: "PDF Globals"
    },
    fields: [
      {
        name: 'layouts',
        type: 'blocks',
        admin: {
          initCollapsed: true,
        },
        blocks: [
          pdfHeaderLayout(relationTo,collectionFields,pluginOptions),
          pdfFooterLayout(relationTo,collectionFields,pluginOptions)
        ]
      },
    ],
  }
  return PDFGlobalSectionLayouts
}
