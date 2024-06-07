import * as React from 'react';
import { SelectInput, useAllFormFields, useField } from 'payload/components/forms';

export const GroupFieldSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
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
          fieldList = Object.keys(data.docs[0]).map((field: any) => {
            return {
              label: `${field}`,
              value: `${field}`
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
        path={path}
        name={path}
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