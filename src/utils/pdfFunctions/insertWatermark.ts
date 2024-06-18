import jsPDF from "jspdf";
import { toBase64 } from "../pdfAttachments/base64Conversion";

export async function insertWatermark(doc: jsPDF, watermark: string): Promise<jsPDF>{
  try {
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/pdf-watermarks`)
    const data = await response.json()
    //const image = await toBase64(data)
    const totalPages = doc.getNumberOfPages()

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      //doc.addImage(image, 'PNG', 40, 40, 75, 75);
      doc.setTextColor(150);
      //doc.text(50, doc.internal.pageSize.height - 30, 'Watermark');
    }

  } catch (e) {
    console.log(e)
  }
  return doc
}