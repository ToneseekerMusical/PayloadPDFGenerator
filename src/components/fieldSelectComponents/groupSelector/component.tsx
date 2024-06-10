import * as React from 'react';
import type { Props as SelectFieldProps } from 'payload/components/fields/Select'
import { SelectInput, useAllFormFields, useField } from 'payload/components/forms';
import { CollectionFieldList, PluginConfig } from '../../../types'

type GroupFieldSelectFieldProps = SelectFieldProps & {
  path: string,
  collectionConfig: CollectionFieldList[],
  parentField?: string
}

export const GroupFieldSelectComponent: React.FC<GroupFieldSelectFieldProps> = (props) => {

  const { value, setValue } = useField<string>({ path: props.path });
  const [options, setOptions] = React.useState([{label: '',value: 'none'}]);

  const assigned = useAllFormFields()[0].assignedCollections.value
  const parent = useAllFormFields()[0]

  // Fetch options on component mount
  React.useEffect(()=>{
    const noArrays = [{label:`No array fields exist in the ${assigned} collection`, value: 'none'}]

    const arrayFields = props.collectionConfig.filter((collection)=>{
      return collection.collection === assigned ? true : false
    })[0].fields.filter((fields)=>{
      return fields.type === 'group' ? true : false
    }).map((field)=>{
      return {label: `${field.name}`, value: `${field.name}`}
    })
    
    const fieldList = arrayFields.length === 0 ? noArrays : arrayFields
    
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

export const getGroupFieldSelectField = (props: GroupFieldSelectFieldProps) => <GroupFieldSelectComponent {...props}/>