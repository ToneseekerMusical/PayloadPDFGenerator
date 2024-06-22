import { Block } from "payload/types";
import { pdfElementPlacement } from "../fields/pdfElementPlacement";
import { pdfImageSize } from "../fields/pdfImageSize";

export function pdfImage(relationTo: string) {
  const block: Block = {
    slug: 'pdfImage',
    imageAltText: 'Creates a PDF image element from field values',
    interfaceName: 'PDFImage', 
    fields:[
      {
        name: 'imageSource',
        type: 'relationship',
        relationTo: `${relationTo}`,
        hasMany: false,
        filterOptions: {
          mimeType: {contains: 'image/'}
        },
      },
      ...pdfElementPlacement,
      ...pdfImageSize
    ]
  }
  return block
}