import jsPDF from "jspdf";
import { PdfTemplate } from "../types";
import initPDF from "./pdfFunctions/initPDF";
import getTemplates from "./pdfFunctions/pdfTemplateQuery";
import { outputPDF } from "./pdfFunctions/openSaveBehavior";

interface OutputTypeType {
  Save: string
  DataURIString: string
  DataURI: string
  Blob: string
  ArrayBuffer: string
}

const OutputType = {
  Save: 'save', //save pdf as a file
  DataUriString: 'datauristring', //returns the data uri string
  DataUri: 'datauri', //opens the data uri in current window
  DataUrlNewWindow: 'dataurlnewwindow', //opens the data uri in new window
  Blob: 'blob', //return blob format of the doc,
  ArrayBuffer: 'arraybuffer', //return ArrayBuffer format
}

interface pdf {
  outputType: OutputTypeType | string
  onJsPDFDocCreation?: (doc: jsPDF) => void
  returnJsPDFDocObject?: boolean
  fileName: string
  format?: string
  orientation?: 'p' | 'portrait' | 'l' | 'landscape'
  unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc'
  compress?: boolean
  pageEnable?: boolean
  pageLabel?: string
}

export default async function pdfGenerator(fields: { [path: string]: unknown; }, collection: string): Promise<void> {
  const template: PdfTemplate | undefined = await getTemplates(collection)
  if (template === undefined){
    return
  }
  console.log(template)
  console.log(fields)
  const options = {
    orientation: template.pageOptions.orientation ? template.pageOptions.orientation : 'p',
    format: template.pageOptions.pageSize !== 'custom' ? template.pageOptions.pageSize : [template.pageOptions.customPageSize?.width, template.pageOptions.customPageSize?.length],
    unit: template.pageOptions.units ? template.pageOptions.units : 'px',
    compress: template.enableCompression,
  }

  const fileName = template.fileOptions.fileNameField ? {
    reportName: template.title,
    //need to pass fileNameField value, not name
    fileNameField: template.fileOptions.fileNameField
  } : undefined

  const file = initPDF(options)


  outputPDF(template.fileOptions.buttonBehavior, file, fileName)
}
