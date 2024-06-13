import * as React from 'react';
import type { Props as SelectFieldProps } from 'payload/components/fields/Select'
import { SelectInput, useField } from 'payload/components/forms';

type globalSelectFieldProps = SelectFieldProps & {
  path: string,
  global?: string
}

export const globalSelectComponent: React.FC<globalSelectFieldProps> = (props) => {
  const { value, setValue } = useField<string>({ path: props.path });
  const [options, setOptions] = React.useState([{label: '',value: 'none'}]);

  // Fetch options on component mount
  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/${props.global}`)
        const data = await response.json()
        const options = Object.values(data)
        .flatMap((option)=>{
          return typeof option !== 'string' ? option : null
        }).filter((option)=>{
          return option !== null ? true : false
        }).flatMap((option: any)=>{
          console.log(option)
          return option.layoutName ? 
            {label: `${option.layoutName}`, value: `${option.layoutName}`} :
            option.watermarkName ? 
            {label: `${option.watermarkName}`, value: `${option.watermarkName}`} :
            option.fontFile ? 
            {label: `${option.fontFile.filename}`, value: `${option.fontFile.url}`} :
            {label:`Please create an in the ${props.global} document`,value:''}
        })
        
        setOptions(
          options.sort(
            (a, b) => a.label.localeCompare(b.label)
          )
        )
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);

  React.useEffect(() => {
    if (value && !Array.isArray(value)) {
      // convert saved stringified array back to an array
      const newValue = JSON.parse(value);
      setValue(newValue)
    }
  }, [value]);

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
        onChange={
          (selectedOption) => {
            if (!Array.isArray(selectedOption)) return
            const newValue = selectedOption.map((option) => option.value)
            setValue(newValue)
          }
        }
      />
    </div>
  )
};

function useCallback(arg0: (selectedOption: any) => void, arg1: ((val: unknown, modifyForm?: boolean) => void)[]) {
  throw new Error('Function not implemented.');
}