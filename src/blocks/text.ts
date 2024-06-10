import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";
import { CollectionFieldList } from "../types";

export function pdfText(collectionConfig: CollectionFieldList){
  const block: Block = {
    slug: 'pdfText',
    imageAltText: 'Creates a PDF text element from a field value',
    interfaceName: 'PDFText',
    fields:[
      pdfTextFields(collectionConfig)
    ]
  }
  return block
}