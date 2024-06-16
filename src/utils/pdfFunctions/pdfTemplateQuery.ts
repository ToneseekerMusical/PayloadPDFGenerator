import { PdfTemplate } from "../../types"

async function getTemplates(collection:string){
  try{
    const req = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/pdf-Templates`)
    const data = await req.json()
    const template: PdfTemplate[] = await data.docs
      .filter((doc: PdfTemplate)=>{
        return doc.assignedCollections === collection ? true : false
      })
    return template[0]
  } catch (err) {
    console.error(err)
  }
}

export default getTemplates