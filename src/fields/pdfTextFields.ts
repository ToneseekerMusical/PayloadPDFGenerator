import { Field } from "payload/types";
import { pdfElementRotation } from "./pdfElementRotation";
import ColorPickerField from "../components/colorPicker/colorPickerField";
import { globalSelectComponent } from "../components/fieldSelectComponents/globalSelector/component";

export const pdfTextFields: Field = {
  name: 'overrides',
  type: 'group',
  admin: {
    condition: (_, siblingData)=>{
      return siblingData.textStyleOverrides
    }
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'multilineText',
          type: 'checkbox',
          defaultValue: false,
          required: true
        },
        {
          name: 'multilineWidth',
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
          admin: {
            condition: (_, siblingData) => {
              return siblingData.multilineText
            }
          },
          required: true,
          defaultValue: 'fill'
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'overrideTextAlignment',
          type: 'checkbox',
          required: true
        },
        {
          name: 'align',
          type: 'select',
          options: [
            {label: 'Left', value: 'left'},
            {label: 'Center', value: 'center'},
            {label: 'Right', value: 'right'},
            {label: 'Justify', value: 'justify'},
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
          name: 'baseline',
          type: 'select',
          options: [
            {label: 'Alphabetic', value: 'alphabetic'},
            {label: 'Ideographic', value: 'ideographic'},
            {label: 'Bottom', value: 'bottom'},
            {label: 'Top', value: 'top'},
            {label: 'Middle', value: 'middle'},
            {label: 'Hanging', value: 'hanging'},
          ],
          defaultValue: 'bottom',
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.overrideTextAlignment
            },
            description: 'Sets the vertical alignment of the text.'
          }
        },
      ]
    },
    pdfElementRotation,
    {
      type: 'row',
      fields: [
        {
          name: 'overrideCharacterSpacing',
          type: 'checkbox',
          required: true
        },
        {
          name: 'charSpace',
          label: 'Character Spacing',
          type: 'number',
          min: 0,
          defaultValue: 0,
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.overrideCharacterSpacing
            }
          }
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'overrideLineHeightFactor',
          type: 'checkbox',
          required: true
        },
        {
          name: 'lineHeightFactor',
          type: 'number',
          min: 0.25,
          defaultValue: 1.15,
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.overrideLineHeightFactor
            }
          }
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'textColorOverride',
          type: 'checkbox',
          defaultValue: false,
          required: true
        },
        {
          name: 'textColor',
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
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fontOverride',
          type: 'checkbox',
          defaultValue: false,
          required: true
        },
        {
          name: 'fontSelection',
          type: 'text',
          admin: {
            components: {
              Field: (props) => globalSelectComponent({...props, global: 'pdf-fonts'})
            },
            condition: (_, siblingData) => {
              return siblingData.fontOverride
            }
          },
          defaultValue: 'Courier',
          required: true
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'overrideTextRendering',
          type: 'checkbox',
          required: true
        },
        {
          name: 'renderingMode',
          type: 'select',
          options: [
            {label: 'Fill', value: 'fill'},
            {label: 'Stroke', value: 'stroke'},
            {label: 'Fill then Stroke', value: 'fillThenStroke'},
            {label: 'Invisible', value: 'invisible'},
            {label: 'Fill and add for clipping', value: 'fillAndAddForClipping'},
            {label: 'Stroke and add path for clipping', value: 'strokeAndAddPathForClipping'},
            {label: 'Fill then Stroke and add to path for clipping', value: 'fillThenStrokeAndAddToPathForClipping'},
            {label: 'Add to path for clipping', value: 'addToPathForClipping'},
          ]
        }
      ]
    }
  ]
}