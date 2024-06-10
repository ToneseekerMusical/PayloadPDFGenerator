import type { Plugin } from 'payload/config'

import { onInitExtension } from './onInitExtension'
import type { CollectionFieldList, PluginConfig } from './types'
import { extendWebpackConfig } from './webpack'
import AfterDashboard from './components/AfterDashboard'
import PDFTemplates from './collections/pdfTemplates'
import PDFHeader from './globals/pdfHeader'
import PDFFooter from './globals/pdfFooter'
import PDFWatermark from './globals/pdfWatermark'
import { BlockField, RowField, Tab, TabsField, UIField } from 'payload/types'
import generatePDFButton from './components/generateButton/inputField'
import generatePDFCell from './components/generateButton/cell'
import PDFFonts from './globals/pdfFonts'
import fieldWalk from './utils/fieldWalk'
import { pdfImage } from './blocks/image'
import { pdfPath } from './blocks/path'
import { pdfSection } from './blocks/section'
import { pdfTable } from './blocks/table'
import { pdfText } from './blocks/text'

export const PDFGenerator =
  (pluginOptions: PluginConfig): Plugin =>
    (incomingConfig) => {

      if(!incomingConfig || !incomingConfig.collections){
        throw new Error('Invalid incoming configuration or collections are missing')
      }

      let config = { ...incomingConfig }

      const collectionSelection: RowField = {
        type:'row',
        fields: [
          {
            name: 'title',
            type: 'text',
            admin: {
              width: "50"
            }
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
      }
      //@ts-expect-error
      const collectionFields: CollectionFieldList = incomingConfig.collections.filter((collection)=>{
        return pluginOptions?.collections?.includes(collection.slug)
      }).map((collection)=>{
        return {
          collection: collection.slug,
          fields: fieldWalk(collection.fields)
        }
      })

      const fieldMapping: Tab = {
        label: 'Field Mapping',
        fields: [
          {
            name: 'Fields',
            type: 'blocks',
            blocks: [
              pdfImage(pluginOptions.uploadsCollection),
              pdfPath(collectionFields),
              pdfSection(collectionFields),
              pdfTable(collectionFields),
              pdfText(collectionFields),
            ]
          }
        ]
      }

      const pdfGeneratorButton: UIField = {
        name: 'generatePDF',
        label: 'Generate PDF',
        type: 'ui',
        admin: {
          components: {
            Field: generatePDFButton,
            Cell: generatePDFCell,
          },
        },
      }

      // If you need to add a webpack alias, use this function to extend the webpack config
      const webpack = extendWebpackConfig(incomingConfig)

      config.admin = {
        ...(config.admin || {}),
        // If you extended the webpack config, add it back in here
        // If you did not extend the webpack config, you can remove this line
        webpack,

        // Add additional admin config here

        components: {
          ...(config.admin?.components || {}),
          // Add additional admin components here
          afterDashboard: [
            ...(config.admin?.components?.afterDashboard || []),
            AfterDashboard,
          ],
        },
      }

      // If the plugin is disabled, return the config without modifying it
      // The order of this check is important, we still want any webpack extensions to be applied even if the plugin is disabled
      if (pluginOptions.enabled === false) {
        return config
      }

      PDFTemplates.fields.unshift(collectionSelection)

      //@ts-expect-error
      PDFTemplates.fields[1].tabs.push(fieldMapping)

      config.collections = [
        ...(config.collections || []),
        // Add additional collections here
        PDFTemplates, // delete this line to remove the example collection
      ]

      config.endpoints = [
        ...(config.endpoints || []),
        {
          path: '/custom-endpoint',
          method: 'get',
          root: true,
          handler: (req, res): void => {
            res.json({ message: 'Here is a custom endpoint' });
          },
        },
        // Add additional endpoints here
      ]

      config.globals = [
        ...(config.globals || []),
        PDFHeader,
        PDFFooter,
        PDFWatermark,
        PDFFonts
      ]

      config.hooks = {
        ...(config.hooks || {}),
        // Add additional hooks here
      }

      config.onInit = async payload => {
        if (incomingConfig.onInit) await incomingConfig.onInit(payload)
        // Add additional onInit code by using the onInitExtension function
        onInitExtension(pluginOptions, payload)
        
      }

      return {
        ...config,
        collections:
          config.collections?.map((collection) => {
            const { slug } = collection
            const isEnabled = pluginOptions?.collections?.includes(slug)
                        
            if (isEnabled) {
              if (pluginOptions?.tabbedUI) {
              // prevent issues with auth enabled collections having an email field that shouldn't be moved to the SEO tab
              const emailField =
                (collection.auth ||
                  // @ts-expect-error
                  !(typeof collection.auth === 'object' && collection.auth.disableLocalStrategy)) &&
                collection.fields?.find((field) => 'name' in field && field.name === 'email')

              const PDFTabs: TabsField[] = [
                {
                  type: 'tabs',
                  tabs: [
                    // append a new tab onto the end of the tabs array, if there is one at the first index
                    // if needed, create a new `Content` tab in the first index for this collection's base fields
                    ...(collection?.fields?.[0]?.type === 'tabs'
                      ? collection.fields[0]?.tabs
                      : [
                          {
                            fields: [
                              ...((emailField
                                ? collection.fields.filter(
                                    (field) => 'name' in field && field.name !== 'email',
                                  )
                                : collection.fields) || []),
                            ],
                            label: collection?.labels?.singular || 'Content',
                          },
                        ]),
                    {
                      fields: [
                        pdfGeneratorButton,
                      ],
                      label: 'PDF Options',
                    },
                  ],
                },
              ]

              return {
                ...collection,
                admin: {
                  ...collection.admin,
                  defaultColumns: collection.admin?.defaultColumns ? [...collection.admin.defaultColumns, 'pdfGenerator'] : ['pdfGenerator'],
                },
                fields: [
                  ...(emailField ? [emailField] : []),
                  ...PDFTabs,
                  ...(collection?.fields?.[0]?.type === 'tabs' ? collection.fields.slice(1) : []),
                ],
              }
            }
          }
          return {
            ...collection,
            fields: [
              ...collection.fields,
              pdfGeneratorButton
            ],
            admin: {
              ...collection.admin,
              defaultColumns: collection.admin?.defaultColumns ? [...collection.admin.defaultColumns, 'pdfGenerator'] : ['pdfGenerator'],
            },
          }
        }) || []
    }
  }
