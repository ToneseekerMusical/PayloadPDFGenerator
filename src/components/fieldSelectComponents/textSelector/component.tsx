import * as React from 'react';
import type { Props as SelectFieldProps } from 'payload/components/fields/Select'
import { SelectInput, useAllFormFields, useField } from 'payload/components/forms';
import { CollectionFieldList, PluginConfig } from '../../../types'
import { FormField } from 'payload/types';


type TextFieldSelectFieldProps = SelectFieldProps & {
  path: string,
  collectionConfig: CollectionFieldList[],
  parentField?: string
}

export const TextFieldSelectComponent: React.FC<TextFieldSelectFieldProps> = (props) => {
  const { value, setValue } = useField<string>({ path: props.path });
  const [options, setOptions] = React.useState([{label: '',value: 'none'}]);

  var index: number = +props.path.split('.')[1]
  const [headerAssigned]: FormField[] = Object.entries(useAllFormFields()[0]).filter(entry => {
    return entry[0] === `layouts.${index}.assignedCollections` ? true : false
  }).flatMap(entries=>{
    return entries[1]
  })

  const sectionAssigned = useAllFormFields()[0].assignedCollections !== undefined ? 
    useAllFormFields()[0].assignedCollections.value : undefined

  const assigned = sectionAssigned === undefined ? headerAssigned.value : sectionAssigned
  
  let parentField: string
  if (props.parentField !== undefined) {
    
    const parentPath = useAllFormFields()[0].assignedCollections !== undefined ? 
      props.path.split(".").slice(0,2).join(".")+`.${props.parentField}`
      : props.path.split(".").slice(0,4).join(".")+`.${props.parentField}`
    parentField = `${useAllFormFields()[0][parentPath].value}`
  }
  React.useEffect(()=>{
    const noArrays = [{label:`No text fields exist in the ${assigned} collection`, value: 'none'}]

    const arrayFields = props.collectionConfig.filter((collection)=>{
      return collection.collection === assigned ? true : false
    })[0].fields.filter((fields)=>{
      if (parentField === fields.name){
        return fields.name === parentField ? true : false
      } else if (props.parentField === undefined) {
        const ignore = ['ui', 'row', 'group', 'collapsible', 'array']
        return !ignore.includes(fields.type) ? true : false
      }
    }).flatMap((field)=>{
      if (parentField === field.name && field.fields !== undefined){
        return field.fields.map((field)=>{
          return {label: `${field.name}`, value: `${field.name}`}
        })
      } else if (parentField === field.name && field.fields === undefined){
        return {label: `No fields exist on ${parentField}`, value: 'none'}
      } else {
        return {label: `${field.name}`, value: `${field.name}`}
      }
    })

    const fieldList = arrayFields.length === 0 ? noArrays : arrayFields
    fieldList.push({label: 'Static', value: 'static'})
    arrayFields.length === 0 ? setValue('none') : null

    setOptions(
      fieldList.sort(
        (a, b) => a.label.localeCompare(b.label)
      )
    )
  }, [])
  return (
    <div>
      <label className='field-label'>
        Field Name
      </label>
      <SelectInput
        path={props.path}
        name={props.path}
        hasMany={false}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  )
};

export const getTextFieldSelectField = (props: TextFieldSelectFieldProps) => <TextFieldSelectComponent {...props}/>