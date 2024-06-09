import * as React from 'react';
import type { Props as SelectFieldProps } from 'payload/components/fields/Select'
import { SelectInput, useAllFormFields, useField } from 'payload/components/forms';
import { PluginConfig } from '../../../types'


type TextFieldSelectFieldProps = SelectFieldProps & {
  path: string,
  pluginConfig: PluginConfig
}

export const TextFieldSelectComponent: React.FC<TextFieldSelectFieldProps> = (props) => {
  const { value, setValue } = useField<string>({ path: props.path });
  const [options, setOptions] = React.useState([{label: '',value: 'none'}]);

  const assigned = useAllFormFields()[0].assignedCollections.value

  // Fetch options on component mount
  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${assigned}`)
        const data = await response.json()
        let fieldList: {label:string, value:string}[]
        if (data.docs[0] !== undefined){
          fieldList = Object.entries(data.docs[0]).filter((field: any)=>{
            return field[1].constructor === String ? true : false
          }).map((field: any) => {
            return {
              label: `${field[0]}`,
              value: `${field[0]}`
            }
          })
        } else {
          fieldList = [
            {label:`Please create a document in ${assigned} collection`,value:''}
          ]
        }
        
        setOptions(
          fieldList.sort(
            (a, b) => a.label.localeCompare(b.label)
          )
        )
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);

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