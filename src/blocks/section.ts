import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";
import { GroupFieldSelectComponent } from "../components/fieldSelectComponents/groupSelector/component";

export const pdfSection: Block = {
  slug: 'pdfSection',
  imageAltText: 'Creates a PDF Section from a group field',
  interfaceName: 'PDFSection',
  fields:[
    {
      name: 'groupField',
      type: 'text',
      admin: {
        components: {
          Field: GroupFieldSelectComponent
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
      name: 'groupFields',
      type: 'array',
      fields: [
        pdfTextFields
      ]
    }
  ]
}