import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { pdfElementPlacement } from "../fields/pdfElementPlacement";

export const pdfHeaderSection: Block = {
  slug: 'pdfHeaderSection',
  imageAltText: 'Creates a PDF Section from a group field',
  interfaceName: 'PDFHeaderSection',
  fields:[
    {
      type: 'row',
      fields: [
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
            return data?.fieldLabel || `Layout ${String(index).padStart(2,'0')}`
          }
        },
      },
      fields: [
        {
          name: 'fieldLabel',
          type: 'text'
        },
        {
          name: 'fieldValue',
          type: 'text',
          required: true
        },
        ...pdfElementPlacement,
        {
          name: 'textStyleOverrides',
          type: 'checkbox',
          required: true
        },
        pdfTextFields
      ]
    }
  ]
}