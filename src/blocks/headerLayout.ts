import { Block } from "payload/types";
import { CollectionFieldList, PluginConfig } from "../types";
import { layoutFields } from "../fields/layoutSettings";
import { pdfHeaderSection } from "./headerSection";
import { pdfImage } from "./image";
import { pdfHeaderPath } from "./headerPath";
import { pdfText } from "./text";
import { pdfSection } from "./section";

export function pdfHeaderLayout(relationTo: string, collectionFields: CollectionFieldList, pluginOptions: PluginConfig) {
  const pdfHeaderLayout: Block = {
    slug: 'pdfHeaderLayout',
    imageAltText: 'Creates a PDF Header',
    interfaceName: 'PDFHeaderLayout',
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
          pdfHeaderPath,
          pdfText()
        ]
      }
    ]
  }
  return pdfHeaderLayout
}