import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";

export const pdfText: Block = {
  slug: 'pdfText',
  imageAltText: 'Creates a PDF text element from a field value',
  interfaceName: 'PDFText',
  fields:[
    pdfTextFields
  ]
}