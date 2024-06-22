import { Block } from "payload/types";
import { pdfElementPlacement } from "../fields/pdfElementPlacement";
import { ArrayFieldSelectComponent } from "../components/fieldSelectComponents/arraySelector/component";
import { CollectionFieldList } from "../types";
import { TextFieldSelectComponent } from "../components/fieldSelectComponents/textSelector/component";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

export function pdfTable(collectionConfig: CollectionFieldList){
  const block: Block = {
    slug: 'pdfTable',
    imageAltText: 'Creates a table from an array field',
    interfaceName: 'PDFTable',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'sourceField',
            type: 'text',
            admin: {
              components: {
                Field: (props) => ArrayFieldSelectComponent({...props, collectionConfig})
              }
            }
          },
          {
            name: 'tableTitle',
            type: 'text',
          }
        ]
      },
      ...pdfElementPlacement,
      {
        name: 'columnSetup',
        type: 'group',
        fields: [
          {
            type: 'row',
            fields: [
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
                name: 'headerFontSize',
                type: 'number',
                min: 8,
                defaultValue: 10
              },
              {
                name: 'cellFontSize',
                type: 'number',
                min: 8,
                defaultValue: 10
              }
            ]
          },
          {
            name: 'columns',
            type: 'array',
            admin: {
              components: {
                RowLabel: ({data, index}: RowLabelArgs)=> {
                  return data?.sourceField || `Path ${String(index).padStart(2,'0')}`
                }
              },
              initCollapsed: true,
            },
            fields: [
              {
                name: 'sourceField',
                type: 'text',
                admin: {
                  components: {
                    Field: (props) => TextFieldSelectComponent({...props, collectionConfig, parentField:'sourceField'})
                  }
                }
              },
              {
                name: 'headerLabel',
                type: 'text',
              }
            ],
          },
        ]
      },
    ]
  }
  return block
}