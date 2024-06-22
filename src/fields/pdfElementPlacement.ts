import { Field } from "payload/types"

export const pdfElementPlacement: Field[] = [
  {
    name: 'placement',
    type: 'select',
    options: [
      {label: 'Relative', value: 'relative'},
      {label: 'Absolute', value: 'absolute'},
    ],
    defaultValue: 'relative',
    required: true,
    admin: {
      description: "Controls how elements are placed. Relative causes element to be added to the pdf document in relation to the previously placed element, following the parent section's content direction. Absolute places element at the exact coordinates using the document unit selection and the default or overridden align / baseline settings."
    }
  },
  {
    type: 'row',
    fields: [
      {
        name: 'xPosition',
        type: 'number',
        min: 0,
        defaultValue: 0,
        required: true
      },
      {
        name: 'yPosition',
        type: 'number',
        min: 0,
        defaultValue: 0,
        required: true
      },
    ],
    admin: {
      condition: (_, siblingData) => {
        return siblingData.placement === 'absolute' ? true : false
      }
    }
  },
]