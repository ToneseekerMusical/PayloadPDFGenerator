import * as React from 'react';
import type { Props as SelectFieldProps } from 'payload/components/fields/Select'
import { SelectInput, useAllFormFields, useField } from 'payload/components/forms';
import { CollectionFieldList, FieldList } from '../../../types';

type ArrayFieldSelectFieldProps = SelectFieldProps & {
  path: string,
  collectionConfig: CollectionFieldList[]
}

export const ArrayFieldSelectComponent: React.FC<ArrayFieldSelectFieldProps> = (props) => {

  const { value, setValue } = useField<string>({ path: props.path });
  const [options, setOptions] = React.useState([{label: '',value: 'none'}]);

  const assigned = useAllFormFields()[0].assignedCollections.value
  //const parent = useAllFormFields()

  //Need to add parent field filters
  React.useEffect(()=>{
    const noArrays = [{label:`No array fields exist in the ${assigned} collection`, value: 'none'}]

    const arrayFields = props.collectionConfig.filter((collection)=>{
      return collection.collection === assigned ? true : false
    })[0].fields.filter((fields)=>{
      return fields.type === 'array' ? true : false
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

export const getArrayFieldSelectField = (props: ArrayFieldSelectFieldProps) => <ArrayFieldSelectComponent {...props}/>