import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";
import { CollectionFieldList } from "../types";
import { TextFieldSelectComponent } from "../components/fieldSelectComponents/textSelector/component";

export function pdfText(collectionConfig?: CollectionFieldList){
  const block: Block = {
    slug: 'pdfText',
    imageAltText: 'Creates a PDF text element from a field value',
    interfaceName: 'PDFText',
    fields:[
      {
        name: 'type',
        type: 'select',
        options: collectionConfig !== undefined ? [
          {label: 'Static', value: 'static'},
          {label: 'Dynamic', value: 'dynamic'},
        ] : [{label: 'Static', value: 'static'}],
        defaultValue: collectionConfig !== undefined ? 'dynamic' : 'static',
        required: true
      },
      {
        type: 'row',
        fields: [
          {
            name: 'sourceField',
            type: 'text',
            admin: {
              condition: (_, siblingData)=>{
                return siblingData.type === 'dynamic' ? true : false
              },
              components: {
                Field: (props) => TextFieldSelectComponent({...props, collectionConfig}),
              }
            },
            required: true
          },
          {
            name: 'value',
            type: 'text',
            required: true,
            admin: {
              condition: (_, siblingData)=>{
                return siblingData.type === 'static' ? true : false
              }
            }
          },
          {
            name: 'label',
            type: 'text'
          },
        ]
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