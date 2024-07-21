import jsPDF from "jspdf";
import { Margins, pdfCursor } from "../../types";

export async function insertLayout(doc: jsPDF, global: string, layoutName: string, margins: Margins): Promise<{doc:jsPDF,cursor:pdfCursor}>{

  const cursor: pdfCursor = {
    xPos: margins.horz,
    yPos: margins.vert
  }

  try {
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/${global}`)
    const data = await response.json()
    console.log(data.layouts)
    
  } catch (e) {
    console.log(e)
  }
  return {doc, cursor}
}