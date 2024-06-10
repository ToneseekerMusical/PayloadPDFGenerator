import { Field } from "payload/types"

export const pdfElementPlacement: Field = {
  name: 'pdfElementPlacement',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'xPosition',
          type: 'number',
          min: 0,
          defaultValue: 0
        },
        {
          name: 'yPosition',
          type: 'number',
          min: 0,
          defaultValue: 0
        },
      ]
    },
  ]
}