import type { Plugin } from 'payload/config'
import { onInitExtension } from './onInitExtension'
import type { CollectionFieldList, PluginConfig } from './types'
import { extendWebpackConfig } from './webpack'
import { PDFTemplates } from './collections/pdfTemplates'
import { PDFHeader } from './globals/pdfHeader'
import { PDFWatermark } from './globals/pdfWatermark'
import { SelectField, TabsField, UIField } from 'payload/types'
import generatePDFButton from './components/generateButton/inputField'
import generatePDFCell from './components/generateButton/cell'
import { PDFFonts } from './globals/pdfFonts'
import { PDFFooter } from './globals/pdfFooter'
import fieldWalk from './utils/pdfFunctions/fieldWalk'

export const PDFGenerator =
  (pluginOptions: PluginConfig): Plugin =>
    (incomingConfig) => {

      if(!incomingConfig || !incomingConfig.collections){
        throw new Error('Invalid incoming configuration or collections are missing')
      }

      let config = { ...incomingConfig }


      const collectionFields: CollectionFieldList = incomingConfig.collections.filter((collection)=>{
        return pluginOptions?.collections?.includes(collection.slug)
      }).map((collection)=>{
        return {
          collection: collection.slug,
          fields: fieldWalk(collection.fields)
        }
      })

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
            //AfterDashboard,
          ],
        },
      }

      // If the plugin is disabled, return the config without modifying it
      // The order of this check is important, we still want any webpack extensions to be applied even if the plugin is disabled
      if (pluginOptions.enabled === false) {
        return config
      }

      config.collections = [
        ...(config.collections || []),
        // Add additional collections here
        PDFTemplates(collectionFields, pluginOptions), // delete this line to remove the example collection
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
        PDFHeader(pluginOptions.uploadsCollection, collectionFields),
        PDFFooter(pluginOptions.uploadsCollection),
        PDFWatermark(pluginOptions.uploadsCollection),
        PDFFonts(pluginOptions.uploadsCollection)
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
                                pdfGeneratorButton,
                            ],
                            label: collection?.labels?.singular || 'Content',
                          },
                        ]),
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
