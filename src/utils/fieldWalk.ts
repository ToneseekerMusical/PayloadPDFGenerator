import { Field } from "payload/types"

interface FieldList {
  name: string,
  type: string,
  fields?: FieldList[]
}[]

export default function fieldWalk(fields: Field[]){
  const fieldList: FieldList = fields.filter((field)=>{
    let ignore = ['tabs', 'ui', 'collapsible', 'row']
    if (!ignore.includes(field.type)) {
      return true
    }
  }).map((field)=>{
    if ( field.type === 'array' || field.type === 'group'){
      return {
        name: field.name,
        type: field.type,
        fields: fieldWalk(field.fields)
      }
    } else {
      return {
        name: field.name,
        type: field.type
      }
    }
  })
  return fieldList
}