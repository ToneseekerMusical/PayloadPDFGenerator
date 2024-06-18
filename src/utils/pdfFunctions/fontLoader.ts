import { toBase64 } from "../pdfAttachments/base64Conversion";
import { Font } from "../../types";
import { jsPDF } from 'jspdf'

export async function fontLoader(doc: jsPDF, fontList: Array<Font>): Promise<jsPDF>{
  fontList.forEach( async (f: Font)=>{
    const filename: string = f.url.split('/').slice(-1)[0]
    try {
      const req = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}${f.url}`)
      const data = await req.blob()
      const font = await toBase64(data)
      const callAddFont: () => void = function () {
        doc.addFileToVFS(filename, font)
        doc.addFont(filename, f.fontName, f.emphasis)
      }
      jsPDF.API.events.push(['addFonts', callAddFont])
    } catch (e) {
      console.log(e)
    }
  })
  return doc
}