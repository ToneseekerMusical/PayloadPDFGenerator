import { Block } from "payload/types";
import { CollectionFieldList, PluginConfig } from "../types";
import { layoutFields } from "../fields/layoutSettings";
import { pdfHeaderSection } from "./headerSection";
import { pdfImage } from "./image";
import { pdfHeaderPath } from "./headerPath";
import { pdfText } from "./text";

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
          pdfHeaderSection(collectionFields, pluginOptions),
          pdfImage(relationTo),
          pdfHeaderPath,
          pdfText()
        ]
      }
    ]
  }
  return pdfFooterLayout
}