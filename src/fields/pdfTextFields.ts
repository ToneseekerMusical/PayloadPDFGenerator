import { Field } from "payload/types";
import { FieldSelectComponent } from "../components/fieldSelector/component";
import { pdfElementPlacement } from "./pdfElementPlacement";
import { pdfElementRotation } from "./pdfElementRotation";
import ColorPickerField from "../components/colorPicker/colorPickerField";
import { TextFieldSelectComponent } from "../components/fieldSelectComponents/textSelector/component";

export const pdfTextFields: Field = {
  name: 'textConfiguration',
  type: 'group',
  fields: [
    {
      name: 'fieldSelect',
      type: 'text',
      admin: {
        components: {
          Field: TextFieldSelectComponent
        }
      }
    },
    {
      name: 'fieldLabel',
      type: 'text'
    },
    {
      name: 'multilineText',
      type: 'checkbox',
      defaultValue: false,
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
      }
    },
    pdfElementPlacement,
    {
      name: 'justification',
      type: 'select',
      options: [
        {label: 'Left', value: 'left'},
        {label: 'Center', value: 'center'},
        {label: 'Right', value: 'right'},
        {label: 'Justify', value: 'justify'},
      ],
      defaultValue: 'left'
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
      ]
    },
    pdfElementRotation,
    {
      name: 'characterSpacing',
      type: 'number',
      min: 0
    },
    {
      name: 'lineHeightFactor',
      type: 'number',
      min: 0.25,
      defaultValue: 1.15
    },
    {
      name: 'textColorOverride',
      type: 'checkbox',
      defaultValue: false,
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
      }
    },
    {
      name: 'fontOverride',
      type: 'checkbox',
      defaultValue: false
    },
    {
      name: 'fontSelection',
      type: 'text',
      admin: {
        components: {
          Field: FieldSelectComponent
        },
        condition: (_, siblingData) => {
          return siblingData.fontOverride
        }
      }
    }
  ]
}