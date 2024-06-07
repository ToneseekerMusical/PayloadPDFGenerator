import { Block } from "payload/types";
import { pdfElementPlacement } from "../fields/pdfElementPlacement";

export const pdfImage: Block = {
  slug: 'pdfImage',
  imageAltText: 'Creates a PDF image element from field values',
  interfaceName: 'PDFImage',
  fields:[
    //Need to figure out how to get the existing uploads collection to ensure the plugin doesn't break Payload
    //{
    //  name: 'imageSource',
    //  type: 'relationship',
    //  relationTo: 'media',
    //  hasMany: false
    //},
    pdfElementPlacement,
    {
      name: 'imageWidth',
      type: 'point',
    }
  ]
}