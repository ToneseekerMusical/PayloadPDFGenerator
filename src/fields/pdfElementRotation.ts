import { Field } from "payload/types";

export const pdfElementRotation: Field = {
  type: 'row',
  fields: [
    {
      name: 'rotateElement',
      type: 'checkbox',
      defaultValue: false,
      required: true
    },
    {
      name: 'angle',
      type: 'number',
      min: 0,
      max: 359,
      defaultValue: 0,
      admin: {
        condition: (_, siblingData) => {
          return siblingData.rotateElement
        }
      },
      required: true
    },
    {
      name: 'rotationDirection',
      type: 'select',
      options: [
        {label: 'Clockwise', value: '0'},
        {label: 'Counter-Clockwise', value: '1'},
      ],
      defaultValue: '0',
      required: true,
      admin: {
        condition: (_, siblingData) => {
          return siblingData.rotateElement
        }
      },
    }
  ]
}