import { Block } from "payload/types";
import { pdfElementPlacement } from "../fields/pdfElementPlacement";
import { ArrayFieldSelectComponent } from "../components/fieldSelectComponents/arraySelector/component";

export const pdfTable: Block = {
  slug: 'pdfTable',
  imageAltText: 'Creates a table from an array field',
  interfaceName: 'PDFTable',
  fields: [
    {
      name: 'arrayField',
      type: 'text',
      admin: {
        components: {
          Field: ArrayFieldSelectComponent
        }
      }
    },
    pdfElementPlacement,
    {
      name: 'printHeaders',
      type: 'checkbox',
    },
    {
      name: 'autoSizeColumns',
      type: "checkbox",
      defaultValue: true
    },
    {
      name: 'headers',
      type: 'array',
      fields: [
        {
          name: 'headerLabel',
          type: 'text'
        }
      ],
      admin:{
        condition:(_, siblingData)=>{
          return siblingData.printHeaders === true ? true : false
        }
      }
    },
    {
      name: 'fontSize',
      type: 'number',
      min: 8,
      defaultValue: 10
    }
  ]
}