import jsPDF from "jspdf";
import { toBase64 } from "../pdfAttachments/base64Conversion";

export async function insertLayout(doc: jsPDF, global: string, layoutName: string): Promise<jsPDF>{
  console.log(layoutName)
  try {
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/${global}`)
    if(global === 'pdf-watermarks'){
      const data = await response.blob()
      const image = await toBase64(data)
    } else {
      const data = await response.json()
      console.log(data.layouts)
    }

  } catch (e) {
    console.log(e)
  }
  return doc
}