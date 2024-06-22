import jsPDF from "jspdf";
import { Font, PdfTemplate, pdf, pdfDefaults } from "../types";
import initPDF from "./pdfFunctions/initPDF";
import getTemplates from "./pdfFunctions/pdfTemplateQuery";
import { outputPDF } from "./pdfFunctions/openSaveBehavior";
import { fontLoader } from "./pdfFunctions/fontLoader";
import { setDefaults } from "./pdfFunctions/setDefaults";
import { insertLayout} from "./pdfFunctions/insertLayout";
import { insertWatermark } from "./pdfFunctions/insertWatermark";

export default async function pdfGenerator(fields: { [path: string]: unknown; }, collection: string): Promise<void> {
  const template: PdfTemplate | undefined = await getTemplates(collection)
  if (template === undefined){
    return
  }
  console.log(template)
  console.log(fields)
  const options: pdf = {
    putOnlyUsedFonts: true,
    orientation: template.pageOptions.orientation ? template.pageOptions.orientation : 'p',
    format: template.pageOptions.pageSize !== 'custom' ? template.pageOptions.pageSize : [template.pageOptions.customPageSize?.width, template.pageOptions.customPageSize?.length],
    unit: template.pageOptions.units ? template.pageOptions.units : 'px',
    compress: template.enableCompression,
    encryption: template.useEncryption ? template.encryptionSettings : undefined
  }

  const defaults: pdfDefaults = {
    displayMode:{
      zoom: template.defaultDisplayMode.zoom,
      layout: template.defaultDisplayMode.layout,
      pmode: template.defaultDisplayMode.pmode
    },
    rightToLeft: template.rightToLeft,
    path:{
      lineCap:template.pathOptions.defaultLineCapStyle,
      lineJoin:template.pathOptions.defaultLineJoinStyle,
      fillColor:template.pathOptions.defaultFillColor,
      drawColor:template.pathOptions.defaultStrokeColor,
      lineWidth:template.pathOptions.defaultLineWidth,
    },
    font:{
      font:JSON.parse(template.fontOptions.defaultFont),
      fontSize:template.fontOptions.defaultFontSize,
      lineHeightFactor:template.fontOptions.defaultLineHeightFactor,
      textColor:template.fontOptions.defaultTextColor,
      charSpace:template.fontOptions.defaultCharacterSpace,
    }
  }

  //@ts-expect-error
  const fileName: {reportName: string, fileNameField: string} | undefined = template.fileOptions.fileNameField ? {
    reportName: template.title,
    //need to pass fileNameField value, not name
    fileNameField: fields[template.fileOptions.fileNameField]
  } : undefined

  let fonts: Array<Font> = []
  if( template.fields ){
    fonts = template.fields?.flatMap((field)=>{
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
    }).flat()
  }
  fonts.unshift(JSON.parse(template.fontOptions.defaultFont))
  fonts = [... new Set(fonts)].map((font)=>{
    if (typeof font === 'string'){
      //@ts-expect-error
      return font.startsWith('{') ? JSON.parse(font) : null
    }
  }).filter((font)=>{
    return font === null ? false
    : font === undefined ? false
    : true
  })
  
  let file: jsPDF = initPDF(options)
  file = await fontLoader(file, fonts)
  file = setDefaults(file, defaults)
  template.layoutOptions?.headerLayout ? insertLayout(file,'pdf-header',template.layoutOptions.headerLayout) : null
  template.layoutOptions?.footerLayout ? insertLayout(file,'pdf-footer',template.layoutOptions.footerLayout) : null
  

  
  template.layoutOptions?.watermark ? insertWatermark(file,template.layoutOptions.watermark) : null
  outputPDF(template.fileOptions.buttonBehavior, file, fileName)
}
