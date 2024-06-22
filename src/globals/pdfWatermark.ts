import { GlobalConfig } from 'payload/types';
import { pdfImageSize } from '../fields/pdfImageSize';
import { pdfTextFields } from '../fields/pdfTextFields';

export function PDFWatermark(relationTo: string){
  const PDFWatermarks: GlobalConfig = {
    slug: 'pdf-watermarks',
    admin: {
      group: "PDF Globals"
    },
    fields: [
      {
        name: 'watermarks',
        type: 'array',
        required: true,
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'watermarkName',
                type: 'text',
                required: true
              },
              {
                name: 'watermarkType',
                type: 'select',
                options: [
                  {label: 'Image', value: 'image'},
                  {label: 'Text', value: 'text'},
                ]
              },
              {
                name: 'imageSettings',
                type: 'group',
                fields: [
                  {
                    name: 'watermark',
                    type: 'upload',
                    relationTo: `${relationTo}`,
                    required: true
                  },
                  ...pdfImageSize
                ],
                admin: {
                  condition: (_, siblingdata)=>{
                    return siblingdata.watermarkType === 'image' ? true : false
                  }
                }
              },
              {
                name: 'textSettings',
                type: 'group',
                fields:[
                  {
                    name: 'watermark',
                    type: 'text',
                    defaultValue: 'Payload PDF Generator',
                    required: true
                  },
                  {
                    name: 'textStyleOverrides',
                    type: 'checkbox',
                    required: true
                  },
                  pdfTextFields
                ],
                admin: {
                  condition: (_, siblingData)=>{
                    return siblingData.watermarkType === 'text' ? true : false
                  }
                }
              }
            ]
          }
        ]
      }
    ],
  }
  return PDFWatermarks
}