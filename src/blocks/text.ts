import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";
import { CollectionFieldList } from "../types";
import { TextFieldSelectComponent } from "../components/fieldSelectComponents/textSelector/component";

export function pdfText(collectionConfig: CollectionFieldList){
  const block: Block = {
    slug: 'pdfText',
    imageAltText: 'Creates a PDF text element from a field value',
    interfaceName: 'PDFText',
    fields:[
      {
        name: 'sourceField',
        type: 'text',
        admin: {
          components: {
            Field: (props) => TextFieldSelectComponent({...props, collectionConfig}),
          }
        }
      },
      {
        name: 'label',
        type: 'text'
      },
      {
        name: 'textStyleOverrides',
        type: 'checkbox',
        required: true
      },
      pdfTextFields
    ]
  }
  return block
}