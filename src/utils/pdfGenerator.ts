import jsPDF from "jspdf";
import { PdfTemplate, fontList, pdf } from "../types";
import initPDF from "./pdfFunctions/initPDF";
import getTemplates from "./pdfFunctions/pdfTemplateQuery";
import { outputPDF } from "./pdfFunctions/openSaveBehavior";
import { fontLoader } from "./pdfFunctions/fontLoader";

export default async function pdfGenerator(fields: { [path: string]: unknown; }, collection: string): Promise<void> {
  const template: PdfTemplate | undefined = await getTemplates(collection)
  if (template === undefined){
    return
  }
  console.log(template)
  console.log(fields)
  const options: pdf = {
    orientation: template.pageOptions.orientation ? template.pageOptions.orientation : 'p',
    format: template.pageOptions.pageSize !== 'custom' ? template.pageOptions.pageSize : [template.pageOptions.customPageSize?.width, template.pageOptions.customPageSize?.length],
    unit: template.pageOptions.units ? template.pageOptions.units : 'px',
    compress: template.enableCompression,
    encryption: template.useEncryption
  }

  const fileName = template.fileOptions.fileNameField ? {
    reportName: template.title,
    //need to pass fileNameField value, not name
    fileNameField: fields[template.fileOptions.fileNameField]
  } : undefined

  const fonts:fontList = {defaultFont: template.fontOptions.defaultFont}
  const fontOverrides = template.fields?.flatMap((field)=>{
    if (field.blockType === 'pdfText'){
      return field.textConfiguration.fontOverride ? field.textConfiguration.fontSelection : null
    }
    if (field.blockType === 'pdfSection'){
      return field.sectionFields.flatMap((field: any)=>{
        return field.textConfiguration.fontOverride ? field.textConfiguration.fontSelection : null
      })
    }
  }).filter((font)=>{
    return typeof font === 'string' ? true : false
  })

  fonts.overrides = [...new Set(fontOverrides)]
  
  let file = initPDF(options)
  file = fontLoader(file, fonts)

  ////@ts-expect-error
  //outputPDF(template.fileOptions.buttonBehavior, file, fileName)
}
