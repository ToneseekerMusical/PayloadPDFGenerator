import { Block } from "payload/types";
import ColorPickerField from "../components/colorPicker/colorPickerField";

export const pdfDivider: Block = {
  slug: 'pdfDivider',
  imageAltText: 'Creates a divider between two sections',
  interfaceName: 'PDFDivider',
  fields:[
    {
      name: 'dividerThickness',
      type: 'number',
      min: 1,
      defaultValue: 2,
      required: true
    },
    {
      name: 'dividerColor',
      type: 'text',
      admin: {
        condition: (_, siblingData) => {
          return siblingData.textColorOverride
        },
        components: {
          Field: ColorPickerField
        }
      },
      defaultValue: '#000000',
      required: true,
    },
    {
      name: 'dividerWidth',
      type: 'select',
      options: [
        {label: '100% Page Width', value: '100pw'},
        {label: '50% Page Width', value: '50pw'},
        {label: '33% Page Width', value: '33pw'},
        {label: '25% Page Width', value: '25pw'},
        {label: '100% Section Width', value: '100sw'},
        {label: '50% Section Width', value: '50sw'},
        {label: '33% Section Width', value: '33sw'},
        {label: '25% Section Width', value: '25sw'},
        {label: 'Fill Remaining', value: 'fill'},
      ],
      required: true,
      defaultValue: '100pw'
    },
    {
      name: 'align',
      type: 'select',
      options: [
        {label: 'Left', value: 'left'},
        {label: 'Center', value: 'center'},
        {label: 'Right', value: 'right'},
      ],
      defaultValue: 'left',
      required: true,
      admin: {
        condition: (_, siblingData) => {
          return siblingData.overrideTextAlignment
        },
        description: 'Sets the horizontal alignment of the text.'
      }
    },
    {
      name: 'topGap',
      type: 'number',
      min: 1,
      defaultValue: 5,
      required: true
    },
    {
      name: 'bottomGap',
      type: 'number',
      min: 1,
      defaultValue: 5,
      required: true
    },
  ]
}