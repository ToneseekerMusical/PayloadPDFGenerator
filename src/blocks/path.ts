import { Block } from "payload/types";
import ColorPickerField from "../components/colorPicker/colorPickerField";
import { ArrayFieldSelectComponent } from "../components/fieldSelectComponents/arraySelector/component";
import { CollectionFieldList } from "../types";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

export function pdfPath(collectionConfig: CollectionFieldList){
  const block: Block = {
    slug: 'pdfPath',
    imageAltText: 'Creates a series of PDF path element from an array of points or vectors',
    interfaceName: 'PDFPath',
    fields:[
      {
        type: 'row',
        fields: [
          {
            name: 'static',
            type: 'checkbox',
            defaultValue: false,
            required: true
          },
          {
            name: 'pdfStrokeColor',
            type: 'text',
            admin: {
              components: {
                Field: ColorPickerField
              },
              width: "33%"
            },
            defaultValue: '#000000'
          },
          {
            name: 'pdfFillColor',
            type: 'text',
            admin: {
              components: {
                Field: ColorPickerField
              },
              width: "33%"
            },
            defaultValue: '#000000'
          },
          {
            name: 'pdfClosedPath',
            type: 'checkbox',
            admin: {
              width: '33%'
            },
          },
        ]
      },
      {
        name: 'pathSourceField',
        type: 'text',
        admin: {
          components: {
            Field: (props) => ArrayFieldSelectComponent({...props, collectionConfig})
          },
          condition: (data, siblingData)=> {
            return !siblingData.static
          }
        }
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
          condition: (data, siblingData)=> {
            return siblingData.static
          }
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
  return block
}