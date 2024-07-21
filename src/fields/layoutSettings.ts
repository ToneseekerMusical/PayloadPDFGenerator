import { Field } from "payload/types";

export const layoutFields: Field[] = [
  {
    name: 'layoutSettings',
    type: 'group',
    fields: [
      {
        name: 'layoutOrientation',
        type: 'select',
        options: [
          {label: 'Horizontal', value: 'horizontal'},
          {label: 'Vertical', value: 'vertical'},
        ],
        required: true,
        defaultValue: 'horizontal'
      },
      {
        name: 'layoutFlow',
        type: 'select',
        options: [
          {label: 'Row', value: 'row'},
          {label: 'Reverse Row', value: 'reverseRow'},
          {label: 'Column', value: 'column'},
        ],
        required: true,
        defaultValue: 'row'
      },
      {
        name: 'anchorPoint',
        type: 'select',
        options: [
          {label: 'Top Left', value: 'topLeft'},
          {label: 'Top Center', value: 'topCenter'},
          {label: 'Top Right', value: 'topRight'},
          {label: 'Middle Left', value: 'midLeft'},
          {label: 'Middle Center', value: 'midCenter'},
          {label: 'Middle Right', value: 'midRight'},
          {label: 'Bottom Left', value: 'botLeft'},
          {label: 'Bottom Center', value: 'botCenter'},
          {label: 'Bottom Right', value: 'botRight'},
        ],
        required: true,
        defaultValue: 'topLeft'
      },
    ]
  },
  {
    type: 'row',
    fields: [
      {
        name: 'positionType',
        type: 'radio',
        options: [
          {label: 'Relative', value: 'relative'},
          {label: 'Absolute', value: 'absolute'},
        ],
        required: true,
        defaultValue: 'relative'
      },
      {
        name: 'xPos',
        label: 'X Position',
        type: 'number',
        required: true,
        defaultValue: 0,
        admin: {
          condition: (data, siblingData)=>{
            const position = data?.xPos || [],
              row = {
                id: siblingData.id,
                positionType: siblingData.positionType
              }
              let show = true
              if (row.positionType === 'absolute') {
                return true
              }
              if (row.positionType === 'relative'){
                return false
              }
            return show
          }
        }
      },
      {
        name: 'yPos',
        label: 'Y Position',
        type: 'number',
        required: true,
        defaultValue: 0,
        admin: {
          condition: (data, siblingData)=>{
            const position = data?.yPos || [],
              row = {
                id: siblingData.id,
                positionType: siblingData.positionType
              }
              let show = true
              if (row.positionType === 'absolute') {
                return true
              }
              if (row.positionType === 'relative'){
                return false
              }
            return show
          }
        }
      }
    ]
  },
  {
    type: 'row',
    fields: [
      {
        name: 'widthType',
        type: 'radio',
        options: [
          {label: 'Relative', value: 'relative'},
          {label: 'Fixed', value: 'fixed'}
        ],
        required: true,
        defaultValue: 'relative'
      },
      {
        name: 'fixedWidth',
        type: 'number',
        min: 30,
        defaultValue: 50,
        required: true,
        admin: {
          condition: (data, siblingData)=>{
            const width = data?.fixedWidth || [],
              row = {
                id: siblingData.id,
                widthType: siblingData.widthType
              }
              let show = true
              if (row.widthType === 'fixed') {
                return true
              }
              if (row.widthType === 'relative'){
                return false
              }
            return show
          }
        }
      },
      {
        name: 'relativeWidth',
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
        defaultValue: '100pw',
        admin: {
          condition: (data, siblingData)=>{
            const width = data?.relativeWidth || [],
              row = {
                id: siblingData.id,
                widthType: siblingData.widthType
              }
              let show = true
              if (row.widthType === 'relative') {
                return true
              }
              if (row.widthType === 'fixed'){
                return false
              }
            return show
          }
        }
      }
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'heightType',
        type: 'radio',
        options: [
          {label: 'Relative', value: 'relative'},
          {label: 'Fixed', value: 'fixed'}
        ],
        required: true,
        defaultValue: 'fixed'
      },
      {
        name: 'fixedHeight',
        type: 'number',
        min: 30,
        required: true,
        defaultValue: 50,
        admin: {
          condition: (data, siblingData)=>{
            const width = data?.fixedHeight || [],
              row = {
                id: siblingData.id,
                heightType: siblingData.heightType
              }
              let show = true
              if (row.heightType === 'fixed') {
                return true
              }
              if (row.heightType === 'relative'){
                return false
              }
            return show
          }
        }
      },
      {
        name: 'relativeHeight',
        type: 'select',
        options: [
          {label: '100% Page Height', value: '100ph'},
          {label: '50% Page Height', value: '50ph'},
          {label: '33% Page Height', value: '33ph'},
          {label: '25% Page Height', value: '25ph'},
          {label: '100% Section Height', value: '100sh'},
          {label: '50% Section Height', value: '50sh'},
          {label: '33% Section Height', value: '33sh'},
          {label: '25% Section Height', value: '25sh'},
          {label: 'Fill Remaining', value: 'fill'},
        ],
        required: true,
        defaultValue: '100ph',
        admin: {
          condition: (data, siblingData)=>{
            const width = data?.fixedHeight || [],
              row = {
                id: siblingData.id,
                heightType: siblingData.heightType
              }
              let show = true
              if (row.heightType === 'relative') {
                return true
              }
              if (row.heightType === 'fixed'){
                return false
              }
            return show
          }
        }
      },
    ]
  },
  {
    type: 'row',
    fields: [
      {
        name: 'topDivider',
        type: 'checkbox',
        defaultValue: false,
        required: true,
        admin: {
          width: '25%'
        }
      },
      {
        name: 'bottomDivider',
        type: 'checkbox',
        defaultValue: false,
        required: true,
        admin: {
          width: '25%'
        }
      },
      {
        name: 'leftDivider',
        type: 'checkbox',
        defaultValue: false,
        required: true,
        admin: {
          width: '25%'
        }
      },
      {
        name: 'rightDivider',
        type: 'checkbox',
        defaultValue: false,
        required: true,
        admin: {
          width: '25%'
        }
      },
    ]
  },
]