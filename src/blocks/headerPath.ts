import { Block } from "payload/types";
import ColorPickerField from "../components/colorPicker/colorPickerField";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

export const pdfHeaderPath: Block = {
  slug: 'pdfHeaderPath',
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
      name: 'pathData',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({data, index}: RowLabelArgs)=> {
            return data?.pathName || `Path ${String(index).padStart(2,'0')}`
          }
        },
      },
      fields: [
        {
          name: 'pathName',
          type: 'text'
        },
        {
          name:'data',
          type:'text',
          admin: {
            description: 'A stringified array of {op: operator, c: coordinates} objects, where op is one of "m" (move to), "l" (line to) "c" (cubic bezier curve) and "h" (close (sub)path)). "c" is an array of coordinates. "m" and "l" expect two, "c" six and "h" an empty array (or undefined).'
          }
        }
      ]
    }
  ]
}