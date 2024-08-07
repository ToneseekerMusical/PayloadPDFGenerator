import { Block } from "payload/types";
import { CollectionFieldList, PluginConfig } from "../types";
import { layoutFields } from "../fields/layoutSettings";
import { pdfImage } from "./image";
import { pdfText } from "./text";
import { pdfPath } from "./path";
import { pdfSection } from "./section";

export function pdfFooterLayout(relationTo: string, collectionFields: CollectionFieldList, pluginOptions: PluginConfig) {
  const pdfFooterLayout: Block = {
    slug: 'pdfFooterLayout',
    imageAltText: 'Creates a PDF Footer',
    interfaceName: 'PDFFooterLayout',
    fields:[
      {
        name: 'assignedCollections',
        type: 'select',
        options: pluginOptions.collections.map((collection:string)=>({
          label: collection, value: collection
        })),
        admin: {
          width: "50",
        },
      },
      {
        name: 'layoutName',
        type: 'text',
        required: true
      },
      ...layoutFields,
      {
        name: 'layoutSections',
        type: 'blocks',
        admin: {
          initCollapsed: true
        },
        blocks: [
          pdfSection(collectionFields),
          pdfImage(relationTo),
          pdfPath(collectionFields),
          pdfText()
        ]
      }
    ]
  }
  return pdfFooterLayout
}