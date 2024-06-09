import { Field } from "payload/types"

export const pdfElementPlacement: Field = {
  name: 'pdfElementPlacement',
  type: 'group',
  fields: [
    {
      name: 'databaseType',
      type: 'radio',
      options: [
        {label: 'MongoDB', value: 'mongoDB'},
        {label: 'Other', value: 'other'},
      ],
      defaultValue: 'mongoDB'
    },
    {
      name: 'xPosition',
      type: 'number',
      min: 0,
      admin: {
        condition: (_, siblingData)=>{
          return siblingData.databaseType === 'other' ? true : false
        }
      }
    },
    {
      name: 'yPosition',
      type: 'number',
      min: 0,
      admin: {
        condition: (_, siblingData)=>{
          return siblingData.databaseType === 'other' ? true : false
        }
      }
    },
    {
      name: 'elementPosition',
      type: 'point',
      admin: {
        condition: (_, siblingData)=>{
          return siblingData.databaseType === 'mongoDB' ? true : false
        }
      }
    }
  ]
}