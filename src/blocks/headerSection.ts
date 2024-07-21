import { Block } from "payload/types";
import { pdfTextFields } from "../fields/pdfTextFields";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { pdfElementPlacement } from "../fields/pdfElementPlacement";
import { sectionLayoutFields } from "../fields/pdfSectionSettings";
import { CollectionFieldList, PluginConfig } from "../types";
import { GroupFieldSelectComponent } from "../components/fieldSelectComponents/groupSelector/component";

export function pdfHeaderSection(collectionConfig: CollectionFieldList) {
  const pdfHeaderSection: Block = {
    slug: 'pdfHeaderSection',
    imageAltText: 'Creates a PDF Section from a group field',
    interfaceName: 'PDFHeaderSection',
    fields:[
      {
        name: 'sourceField',
        type: 'text',
        admin: {
          components: {
            Field: (props) => GroupFieldSelectComponent({...props, collectionConfig})
          }
        }
      },
      ...sectionLayoutFields,
      {
        name: 'sectionFields',
        type: 'array',
        admin: {
          components: {
            RowLabel: ({data, index}: RowLabelArgs)=> {
              return data?.fieldLabel || `Layout ${String(index).padStart(2,'0')}`
            }
          },
        },
        fields: [
          {
            name: 'fieldLabel',
            type: 'text'
          },
          {
            name: 'fieldValue',
            type: 'text',
            required: true
          },
          ...pdfElementPlacement,
          {
            name: 'textStyleOverrides',
            type: 'checkbox',
            required: true
          },
          pdfTextFields
        ]
      }
    ]
  }
  return pdfHeaderSection
}