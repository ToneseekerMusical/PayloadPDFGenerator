import jsPDF from "jspdf";
import { toBase64 } from "../pdfAttachments/base64Conversion";
import { PdfWatermark, pdfCursor } from "../../types";
import { addText } from "../pdfElements/text";

export async function insertWatermark(doc: jsPDF, watermarkName: string): Promise<jsPDF>{
  try {
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/pdf-watermarks`)
    const data: PdfWatermark = await response.json()
    const watermark = data.watermarks?.filter((wm)=>{
      return wm.watermarkName === watermarkName ? true : false
    })[0]

    console.log(watermark)

    const image = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}${watermark?.imageSettings?.watermark.url}`)
    const imgBlob = await image.blob()
    const imgStr = await toBase64(imgBlob)
    
    const cursor: pdfCursor = {
      xPos: doc.internal.pageSize.width/2,
      yPos: doc.internal.pageSize.height/2
    }

    const totalPages = doc.getNumberOfPages()

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      if (watermark?.watermarkType === 'text'){
        //@ts-expect-error
        addText(doc, cursor, watermark.textSettings?.watermark, watermark.textSettings?.overrides)
      }
      if (watermark?.watermarkType === 'image'){
        doc.addImage(
          imgStr,
          watermark.imageSettings?.watermark.mimeType.split("/")[1], 
          //@ts-expect-error
          doc.internal.pageSize.width/2-watermark.imageSettings?.width/2,
          //@ts-expect-error
          doc.internal.pageSize.height/2-watermark.imageSettings?.height/2,
          //@ts-expect-error
          watermark.imageSettings?.width, 
          watermark.imageSettings?.height
        )
      }
    }

  } catch (e) {
    console.log(e)
  }
  return doc
}