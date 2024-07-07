import jsPDF from "jspdf";
import { toBase64 } from "../pdfAttachments/base64Conversion";
import { Margins, PdfWatermark, pdfCursor, textElement } from "../../types";
import { addText } from "../pdfElements/text";
import { addImage } from "../pdfElements/image";

export async function insertWatermark(doc: jsPDF, watermarkName: string, margins:Margins): Promise<jsPDF>{
      
  const cursor: pdfCursor = {
    xPos: doc.internal.pageSize.width/2,
    yPos: doc.internal.pageSize.height/2
  }

  let result = {doc, cursor}

  try {
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/pdf-watermarks`)
    const data: PdfWatermark = await response.json()
    const watermark = data.watermark.filter((wm)=>{
      return wm.watermarkName === watermarkName ? true : false
    })[0]

    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      if (watermark.textSettings !== undefined){
        watermark.textSettings.type = 'static'
        result = addText(
          doc,
          watermark.textSettings,
          margins,
          cursor,
        )
      }
      if (watermark.imageSettings !== undefined){
        result = await addImage(
          doc,
          watermark.imageSettings,
          cursor
        )
      }
    }

  } catch (e) {
    console.log(e)
  }
  return result.doc
}