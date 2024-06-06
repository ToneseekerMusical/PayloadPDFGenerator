import { Field } from "payload/types";

export const pdfElementRotation: Field = {
  name: 'pdfElementRotation',
  type: 'group',
  fields: [
    {
      name: 'rotateElement',
      type: 'checkbox',
      defaultValue: false
    },
    {
      name: 'angle',
      type: 'number',
      min: 0,
      max: 359,
      admin: {
        condition: (_, siblingData) => {
          return siblingData.rotateElement
        }
      }
    },
    {
      name: 'rotationDirection',
      type: 'select',
      options: [
        {label: 'Clockwise', value: '0'},
        {label: 'Counter-Clockwise', value: '1'},
      ],
      admin: {
        condition: (_, siblingData) => {
          return siblingData.rotateElement
        }
      }
    }
  ]
}