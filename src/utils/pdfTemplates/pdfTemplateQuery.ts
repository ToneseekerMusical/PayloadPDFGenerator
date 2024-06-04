async function getTemplate(templateID:string){
  try{
    const req = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/pdf-Templates/${templateID}`)
    const data = await req.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export default getTemplate