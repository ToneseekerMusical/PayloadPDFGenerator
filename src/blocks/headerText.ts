import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";

export const pdfHeaderText: Block = {
  slug: 'pdfHeaderText',
  imageAltText: 'Creates a PDF text element from a field value',
  interfaceName: 'PDFHeaderText',
  fields:[
    {
      name: 'fieldLabel',
      type: 'text'
    },
    {
      name: 'value',
      type: 'text',
      required: true
    },
    pdfTextFields
  ]
}