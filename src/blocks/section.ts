import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";
import { GroupFieldSelectComponent } from "../components/fieldSelectComponents/groupSelector/component";
import { CollectionFieldList } from "../types";
import { TextFieldSelectComponent } from "../components/fieldSelectComponents/textSelector/component";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

export function pdfSection(collectionConfig: CollectionFieldList) {
  const pdfSection: Block = {
    slug: 'pdfSection',
    imageAltText: 'Creates a PDF Section from a group field',
    interfaceName: 'PDFSection',
    fields:[
      {
        type: 'row',
        fields: [
          {
            name: 'sourceField',
            type: 'text',
            admin: {
              components: {
                Field: (props) => GroupFieldSelectComponent({...props, collectionConfig})
              }
            }
          },
          {
            name: 'sectionOrientation',
            type: 'select',
            options: [
              {label: 'Horizontal', value: 'horizontal'},
              {label: 'Vertical', value: 'vertical'},
            ],
            required: true
          },
          {
            name: 'sectionWidth',
            type: 'number',
            min: 30,
            defaultValue: 50
          },
          {
            name: 'sectionHeight',
            type: 'number',
            min: 30,
            defaultValue: 50,
          },
        ]
      },
      {
        type: 'row',
        fields: [
          {
            name: 'topDivider',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              width: '25%'
            }
          },
          {
            name: 'bottomDivider',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              width: '25%'
            }
          },
          {
            name: 'leftDivider',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              width: '25%'
            }
          },
          {
            name: 'rightDivider',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              width: '25%'
            }
          },
        ]
      },
      {
        name: 'sectionFields',
        type: 'array',
        admin: {
          components: {
            RowLabel: ({data, index}: RowLabelArgs)=> {
              return data?.sourceField || `Field ${String(index).padStart(2,'0')}`
            }
          },
          initCollapsed: true
        },
        fields: [
          {
            name: 'sourceField',
            type: 'text',
            admin: {
              components: {
                Field: (props) => TextFieldSelectComponent({...props, collectionConfig, parentField:'sourceField'}),
              }
            }
          },
          {
            name: 'label',
            type: 'text'
          },
          pdfTextFields
        ]
      }
    ]
  }
  return pdfSection
}