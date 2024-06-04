export default async function fieldMapping(collection:string){
  try{
    const req = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${collection}/1`)
    const data = await req.json()
    return [{label:"test",value:"test"}]
  } catch (err) {
    console.error(err)
  }
}