import { Field } from "payload/types"
import { pdfMargins } from "./pdfMargins"
import ColorPickerField from "../components/colorPicker/colorPickerField"

export function PDFFooterFields(relationTo: string){
  const pdfFooterFields: Field[] = [
    {
      name: 'layout',
      type: 'group',
      fields: [
        {
          name: 'footerHeight',
          type: 'number',
          defaultValue: 20,
          min: 10,
          required: true,
        },
        ...pdfMargins,
        {
          type: 'row',
          fields: [
            {
              name: 'topDivider',
              type: 'checkbox',
            },
            {
              name: 'pageNumbers',
              type: 'checkbox'
            },
            {
              name: 'companyName',
              type: 'checkbox'
            },
            {
              name: 'contactInfo',
              type: 'checkbox'
            }
          ]
        },
      ]
    },
    {
      name: 'backgroundSettings',
      type: 'group',
      fields: [
        {
          name: 'layoutBackground',
          type: 'select',
          options: [
            {label: 'Blank', value: 'blank'},
            {label: 'Solid Color', value: 'solid'},
            {label: 'Image', value: 'image'},
          ],
          defaultValue: 'blank'
        },
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: `${relationTo}`,
              admin: {
                condition: (siblingData)=>{
                  return siblingData.layoutBackground === 'image' ? true : false
                }
              }
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'width',
                  type: 'number',
                  min: 10,
                  defaultValue: 10,
                  admin: {
                    condition: (siblingData)=>{
                      return siblingData.layoutBackground === 'image' ? true : false
                    }
                  }
                },
                {
                  name: 'height',
                  type: 'number',
                  min: 10,
                  defaultValue: 10,
                  admin: {
                    condition: (siblingData)=>{
                      return siblingData.layoutBackground === 'image' ? true : false
                    }
                  }
                },
              ]
            },
            {
              name: 'footerFillColor',
              type: 'text',
              admin: {
                components: {
                  Field: ColorPickerField
                },
                width: "33%",
                condition: (_, siblingData)=>{
                  return siblingData.layoutBackground === 'solid' ? true : false
                }
              },
              defaultValue: '#000000'
            },
            ...pdfMargins
          ]
        }
      ],
    },
    {
      name: 'dividerSettings',
      type: 'group',
      fields: [
        {
          name: 'dividerStrokeColor',
          type: 'text',
          admin: {
            components: {
              Field: ColorPickerField
            },
            width: "33%",
          },
          defaultValue: '#000000'
        },
        {
          type: 'row',
          fields: [
            {
              name: 'dividerThickness',
              type: 'number',
              min: 1,
              defaultValue: 1
            },
            ...pdfMargins
          ]
        }
      ],
      admin: {
        condition: (_, siblingData)=>{
          return siblingData.topDivider
        }
      }
    },
    {
      name: 'pageNumberSettings',
      type: 'group',
      fields: [
        {
          name: 'format',
          type: 'text',
          admin: {
            description: 'Type how you want your page numbers to be displayed, replacing the current page with a lowercase x and the total pages with an uppercase X'
          }
        },
        {
          type: 'row',
          fields: [
            {
              name: 'collate',
              type: 'checkbox',
              admin: {
                description: 'Check this box if you want to have your page numbers alternate sides of the page.'
              }
            },
            {
              name: 'footerLocation',
              type: 'radio',
              options: [
                {label: 'Left', value: 'left'},
                {label: 'Center', value: 'center'},
                {label: 'Right', value: 'right'},
              ],
              admin: {
                description: 'Select where in the footer you want your page numbers to appear. If collating your page numbers, select the starting location.'
              }
            }
          ]
        }
      ],
      admin: {
        condition: (_, siblingData)=>{
          return siblingData.pageNumbers
        }
      }
    },
    {
      name: 'companyNameSettings',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              required: true
            },
            {
              name: 'footerLocation',
              type: 'radio',
              options: [
                {label: 'Left', value: 'left'},
                {label: 'Center', value: 'center'},
                {label: 'Right', value: 'right'},
              ],
              admin: {
                description: 'Select where in the footer you want your company name to appear. If collating, select the starting location.'
              }
            }
          ]
        }
      ],
      admin: {
        condition: (_, siblingData)=>{
          return siblingData.companyName
        }
      }
    },
    {
      name: 'contactInfoSettings',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'phoneNumber',
              type: 'text'
            },
            {
              name: 'email',
              type: 'text'
            },
            {
              name: 'address',
              type: 'text'
            },
            {
              name: 'footerLocation',
              type: 'radio',
              options: [
                {label: 'Left', value: 'left'},
                {label: 'Center', value: 'center'},
                {label: 'Right', value: 'right'},
              ],
              admin: {
                description: 'Select where in the footer you want your contact information to appear. If collating, select the starting location.'
              }
            }
          ]
        }
      ],
      admin: {
        condition: (_, siblingData)=>{
          return siblingData.contactInfo
        }
      }
    },
  ]
  return pdfFooterFields
}