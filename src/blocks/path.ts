import { Block } from "payload/types";
import ColorPickerField from "../components/colorPicker/colorPickerField";
import { FieldSelectComponent } from "../components/fieldSelector/component";

export const pdfPath: Block = {
  slug: 'pdfPath',
  imageAltText: 'Creates a series of PDF path element from an array of points or vectors',
  interfaceName: 'PDFPath',
  fields:[
    {
      type: 'row',
      fields: [
        {
          name: 'pdfStrokeColor',
          type: 'text',
          admin: {
            components: {
              Field: ColorPickerField
            },
            width: "33%"
          }
        },
        {
          name: 'pdfFillColor',
          type: 'text',
          admin: {
            components: {
              Field: ColorPickerField
            },
            width: "33%"
          }
        },
        {
          name: 'pdfClosedPath',
          type: 'checkbox',
          admin: {
            width: '33%'
          }
        },
      ]
    },
    {
      name: 'pathSourceField',
      type: 'text',
      admin: {
        components: {
          Field: FieldSelectComponent
        }
      }
    },
  ]
}