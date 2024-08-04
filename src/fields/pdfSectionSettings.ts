import { Field } from "payload/types";

export const sectionLayoutFields: Field[] = [
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
        required: true,
        defaultValue: 'horizontal'
      },
      {
        name: 'sectionFlow',
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
      {
        name: 'sectionPosition',
        type: 'group',
        fields: [
          {
            name: 'positionType',
            type: 'select',
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
              condition: (siblingData)=>{
                return siblingData.positionType === 'absolute' ? true: false
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
              condition: (siblingData)=>{
                return siblingData.positionType === 'absolute' ? true: false
              }
            }
          }
        ]
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
        admin: {
          condition: (siblingData) => {
            return siblingData.widthType === 'fixed' ? true : false
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
        defaultValue: '100pw',
        admin: {
          condition: (siblingData) => {
            return siblingData.widthType === 'relative' ? true : false
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
          condition: (siblingData)=>{
            return siblingData.heightType === 'fixed' ? true : false
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
          condition: (siblingData) => {
            return siblingData.heightType === 'relative' ? true : false
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