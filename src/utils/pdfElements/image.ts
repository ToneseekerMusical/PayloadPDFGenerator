import jsPDF from "jspdf";
import { toBase64 } from "../pdfAttachments/base64Conversion";
import { imageElement, pdfCursor } from "../../types";

export async function addImage(
  doc: jsPDF,
  imageData: imageElement,
  cursor: pdfCursor,
):Promise<{doc: jsPDF, cursor: pdfCursor}>{
  const image = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}${imageData.imageSource.url}`)
  const imgBlob = await image.blob()
  const imgStr = await toBase64(imgBlob)

  //add anchor point and wrap settings to image options in payload
  //add switch state to change coordinates for image insertion
  //add switch state for wrapping type, 
  //need to figure out how to store image size and location to auto-wrap text around images

  doc = doc.addImage(
    imgStr,
    imageData.imageSource.mimeType.split("/")[1], 
    doc.internal.pageSize.width/2-imageData.width/2,
    doc.internal.pageSize.height/2-imageData.height/2,
    imageData.width, 
    imageData.height
  )

  return {doc, cursor}
}