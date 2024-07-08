import jsPDF from "jspdf";
import { Margins, PDFImage, PDFText, PdfWatermark, pdfCursor } from "../../types";
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
    const watermark: PDFText | PDFImage = data.watermarks.filter((wm)=>{
      return wm.blockName === watermarkName ? true : false
    })[0]

    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      if (watermark.blockType === 'pdfText'){
        result = addText(
          doc,
          watermark,
          margins,
          cursor,
        )
      }
      if (watermark.blockType === 'pdfImage'){
        result = await addImage(
          doc,
          watermark,
          cursor
        )
      }
    }

  } catch (e) {
    console.log(e)
  }
  return result.doc
}