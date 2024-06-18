import { CollectionConfig } from 'payload/types';
import { validateHexColor } from '../components/colorPicker/config';
import colorPickerField from '../components/colorPicker/colorPickerField';
import colorPickerCell from '../components/colorPicker/colorPickerCell';
import { pdfTable } from '../blocks/table';
import { pdfSection } from '../blocks/section';
import { pdfText } from '../blocks/text';
import { pdfPath } from '../blocks/path';
import { pdfImage } from '../blocks/image';
import { CollectionFieldList, PluginConfig } from '../types';
import { globalSelectComponent } from '../components/fieldSelectComponents/globalSelector/component';
import { FieldSelectComponent } from '../components/fieldSelector/component';
import { TextFieldSelectComponent } from '../components/fieldSelectComponents/textSelector/component';
import { pdfMargins } from '../fields/pdfMargins';

export function PDFTemplates(collectionFields: CollectionFieldList, pluginOptions: PluginConfig){
  const PDFTemplates: CollectionConfig = {
    slug: 'pdf-templates',
    admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'collectionSlug']
    },
    fields: [
      {
        type:'row',
        fields: [
          {
            name: 'title',
            type: 'text',
            admin: {
              width: "50"
            },
            required: true
          },
          {
            name: 'assignedCollections',
            type: 'select',
            options: pluginOptions.collections.map((collection:string)=>({
              label: collection, value: collection
            })),
            admin: {
              width: "50",
            },
          }
        ]
      },
      {
        type: 'tabs',
        tabs: [
          {
            label: 'Document Setup',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'enableCompression',
                    type: 'checkbox',
                    required: true
                  },
                  {
                    name: 'rightToLeft',
                    type: 'checkbox',
                    required: true
                  }
                ]
              },
              {
                name: 'pageOptions',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'orientation',
                        type: 'select',
                        options: [
                          {label:'Portrait', value:'portrait'},
                          {label:'Landscape', value:'landscape'},
                        ],
                        defaultValue: 'portrait',
                        required: true
                      },
                      {
                        name: 'pageSize',
                        type: 'select',
                        options: [
                          {label:'Letter', value:'letter'},
                          {label:'Government Letter', value:'government-letter'},
                          {label:'Legal', value:'legal'},
                          {label:'Junior Legal', value:'junior-legal'},
                          {label:'Ledger', value:'ledger'},
                          {label:'Tabloid', value:'tabloid'},
                          {label:'Credit Card', value:'credit-card'},
                          {label:'A0', value:'a0'},
                          {label:'A1', value:'a1'},
                          {label:'A2', value:'a2'},
                          {label:'A3', value:'a3'},
                          {label:'A4', value:'a4'},
                          {label:'A5', value:'a5'},
                          {label:'A6', value:'a5'},
                          {label:'A7', value:'a7'},
                          {label:'A8', value:'a8'},
                          {label:'A9', value:'a9'},
                          {label:'A10', value:'a10'},
                          {label:'B0', value:'b0'},
                          {label:'B1', value:'b1'},
                          {label:'B2', value:'b2'},
                          {label:'B3', value:'b3'},
                          {label:'B4', value:'b4'},
                          {label:'B5', value:'b5'},
                          {label:'B6', value:'b6'},
                          {label:'B7', value:'b7'},
                          {label:'B8', value:'b8'},
                          {label:'B9', value:'b9'},
                          {label:'B10', value:'b10'},
                          {label:'C0', value:'c0'},
                          {label:'C1', value:'c1'},
                          {label:'C2', value:'c2'},
                          {label:'C3', value:'c3'},
                          {label:'C4', value:'c4'},
                          {label:'C5', value:'c5'},
                          {label:'C6', value:'c6'},
                          {label:'C7', value:'c7'},
                          {label:'C8', value:'c8'},
                          {label:'C9', value:'c9'},
                          {label:'C10', value:'c10'},
                          {label:'D1', value:'d1'},
                          {label:'Custom', value:'custom'}
                        ],
                        defaultValue: 'letter',
                        required: true
                      },
                    ]
                  },
                  {
                    name: 'customPageSize',
                    type: 'group',
                    fields: [
                      {
                        type: 'row',
                        fields: [
                          {
                            name: 'length',
                            type: 'number',
                            required: true,
                            defaultValue: 0
                          },
                          {
                            name: 'width',
                            type: 'number',
                            required: true,
                            defaultValue: 0
                          }
                        ]
                      }
                    ],
                    admin: {
                      condition: (_, siblingData) => {
                        if(siblingData.pageSize === 'custom'){
                          return true
                        } else {
                          return false
                        }
                      }
                    }
                  },
                  {
                    name: 'units',
                    type: 'select',
                    options: [
                      {label: 'Pixels', value: 'px'},
                      {label: 'Points', value: 'pt'},
                      {label: 'Millimeters', value: 'mm'},
                      {label: 'Centimeters', value: 'cm'},
                      {label: 'Inches', value: 'in'},
                    ],
                    defaultValue: 'px',
                    required: true
                  },
                  ...pdfMargins
                ]
              },
              {
                name:'layoutOptions',
                type: 'group',
                fields: [
                  {
                    type:'row',
                    fields: [
                      {
                        name: 'headerLayout',
                        type: 'text',
                        admin: {
                          components: {
                            Field: (props) => globalSelectComponent({...props, global: 'pdf-header'})
                          }
                        }
                      },
                      {
                        name: 'footerLayout',
                        type: 'text',
                        admin: {
                          components: {
                            Field: (props) => globalSelectComponent({...props, global: 'pdf-footer'})
                          }
                        }
                      },
                      {
                        name: 'watermark',
                        type: 'text',
                        admin: {
                          components: {
                            Field: (props) => globalSelectComponent({...props, global: 'pdf-watermarks'})
                          }
                        }
                      },
                    ]
                  },
                ]
              },
              {
                name: 'fontOptions',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'defaultFontSize',
                        type: 'number',
                        min: 4,
                        max: 20,
                        defaultValue: 4,
                        required: true
                      },
                      {
                        name: 'defaultCharacterSpace',
                        type: 'number',
                        min: 0,
                        defaultValue: 1,
                        required: true
                      },
                      {
                        name: 'defaultLineHeightFactor',
                        type: 'number',
                        min: 0,
                        defaultValue: 1.15,
                        required: true
                      },
                      {
                        name: 'defaultFont',
                        type: 'text',
                        admin: {
                          components: {
                            Field: (props) => globalSelectComponent({...props, global: 'pdf-fonts'})
                          },
                        },
                        defaultValue: 'Courier',
                        required: true
                      },
                      {
                        name: 'defaultTextColor',
                        type: 'text',
                        validate: validateHexColor,
                        required: true,
                        defaultValue: '#000000',
                        admin: {
                          components: {
                            Field: colorPickerField,
                            Cell: colorPickerCell
                          }
                        }
                      },
                    ]
                  }
                ]
              },
              {
                name: 'pathOptions',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'defaultFillColor',
                        type: 'text',
                        validate: validateHexColor,
                        required: true,
                        defaultValue: '#000000',
                        admin: {
                          components: {
                            Field: colorPickerField,
                            Cell: colorPickerCell
                          }
                        }
                      },
                      {
                        name: 'defaultStrokeColor',
                        type: 'text',
                        validate: validateHexColor,
                        required: true,
                        defaultValue: '#000000',
                        admin: {
                          components: {
                            Field: colorPickerField,
                            Cell: colorPickerCell
                          }
                        }
                      },
                      {
                        name: 'defaultLineColor',
                        type: 'text',
                        validate: validateHexColor,
                        required: true,
                        defaultValue: '#000000',
                        admin: {
                          components: {
                            Field: colorPickerField,
                            Cell: colorPickerCell
                          }
                        }
                      },
                    ]
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'defaultStrokeWidth',
                        type: 'number',
                        min: 0,
                        defaultValue: 1,
                        required: true
                      },
                      {
                        name: 'defaultLineWidth',
                        type: 'number',
                        min: 0,
                        defaultValue: 1,
                        required: true
                      },
                      {
                        name: 'defaultLineCapStyle',
                        type: 'select',
                        options: [
                          {label: 'Butt', value: 'butt'},
                          {label: 'Miter', value: 'miter'},
                          {label: 'Round', value: 'round'},
                          {label: 'Square', value: 'square'},
                        ],
                        defaultValue: 'butt',
                        required: true
                      },
                      {
                        name: 'defaultLineJoinStyle',
                        type: 'select',
                        options: [
                          {label: 'Butt', value: 'butt'},
                          {label: 'Miter', value: 'miter'},
                          {label: 'Round', value: 'round'},
                          {label: 'Square', value: 'square'},
                        ],
                        defaultValue: 'butt',
                        required: true
                      },
                    ]
                  }
                ]
              },
            ]
          },
          {
            label: 'Document Behavior',
            fields: [
              {
                name: 'fileOptions',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name:'buttonBehavior',
                        type:'select',
                        options: [
                          {label:'Download', value:'download'},
                          {label:'Open in New Tab', value:'newTab'},
                          {label:'Open in Current Tab', value:'curTab'},
                          {label:'Auto-print', value:'autoprint'},
                        ],
                        defaultValue: 'download',
                        required: true
                      },
                      {
                        name:'fileNameField',
                        type:'text',
                        admin: {
                          components: {
                            Field: (props) => TextFieldSelectComponent({...props, collectionConfig: collectionFields })
                          },
                        }
                      }
                    ]
                  }
                ]
              },
              {
                name: 'useEncryption',
                type: 'checkbox',
                required: true
              },
              {
                name: 'encryptionSettings',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'userPassword',
                        type: 'text'
                      },
                      {
                        name: 'ownerPassword',
                        type: 'text'
                      },
                      {
                        name: 'userPermissions',
                        type: 'select',
                        options: [
                          {label: 'Print', value: 'print'},
                          {label: 'Modify', value: 'modify'},
                          {label: 'Copy', value: 'copy'},
                          {label: 'Annotate', value: 'annot-forms'},
                        ],
                        hasMany: true
                      }
                    ]
                  }
                ],
                admin: {
                  condition: (_, siblingData)=>{
                    return siblingData.useEncryption === true ? true : false
                  }
                }
              },
              {
                name: 'defaultDisplayMode',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'zoom',
                        type: 'select',
                        options: [
                          {label: 'Full Width', value: 'fullwidth'},
                          {label: 'Full Height', value: 'fullheight'},
                          {label: 'Full Page', value: 'fullpage'},
                          {label: 'original', value: 'original'},
                        ],
                        defaultValue: 'fullwidth',
                        required: true
                      },
                      {
                        name: 'layout',
                        type: 'select',
                        options: [
                          {label: 'Continuous', value: 'continuous'},
                          {label: 'Single Page', value: 'single'},
                          {label: 'Two Column Left', value: 'twoleft'},
                          {label: 'Two Column Right', value: 'tworight'}
                        ],
                        defaultValue: 'continuous',
                        required: true
                      },
                      {
                        name: 'pmode',
                        label: 'outlineDisplay',
                        type: 'select',
                        options: [
                          {label: 'Bookmarks', value: 'UseOutlines'},
                          {label: 'Thumbnails', value: 'UseThumbs'},
                          {label: 'Fullscreen', value: 'FullScreen'},
                        ],
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: 'Field Mapping',
            fields: [
              {
                name: 'fields',
                type: 'blocks',
                blocks: [
                  pdfImage(pluginOptions.uploadsCollection),
                  pdfPath(collectionFields),
                  pdfSection(collectionFields),
                  pdfTable(collectionFields),
                  pdfText(collectionFields),
                ]
              },
            ]
          }
        ]
      }
    ],
  }
  return PDFTemplates
}
