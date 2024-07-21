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
  if(props.global === 'pdf-header' || props.global === 'pdf-footer') {
    props.global = 'pdf-global-section-layouts'
  }
  // Fetch options on component mount
  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/${props.global}`)
        const data = await response.json()
        let options = Object.values(data)
        .flatMap((option)=>{
          return typeof option !== 'string' ? option : null
        }).filter((option)=>{
          return option !== null ? true : false
        }).flatMap((option: any)=>{
          return option.layoutName ? 
            {label: `${option.layoutName}`, value: `${option.layoutName}`}
            : option.blockName ? 
            {label: `${option.blockName}`, value: `${option.blockName}`} :
            option.fontFile ? 
            {label: `${option.fontFile.filename}`,value: option.fontFile.url ? `{"url": "${option.fontFile.url}", "fontName": "${option.fontName}", "emphasis": "${option.fontEmphasis}"}`: `${option.fontFile.filename}` }
            : {label:`Please create a  in the ${props.global} document`,value:''}
        })
        
        if (props.global === 'pdf-fonts'){
          options = [...options,
            {label: 'Helvetica', value: 'Helvetica'},
            {label: 'Helvetica-Bold', value: 'Helvetica-Bold'},
            {label: 'Helvetica-Oblique', value: 'Helvetica-Oblique'},
            {label: 'Helvetica-BoldOblique', value: 'Helvetica-BoldOblique'},
            {label: 'Courier', value: 'Courier'},
            {label: 'Courier-Bold', value: 'Courier-Bold'},
            {label: 'Courier-Oblique', value: 'Courier-Oblique'},
            {label: 'Courier-BoldOblique', value: 'Courier-BoldOblique'},
            {label: 'Times-Roman',  value: 'Times-Roman'}, 
            {label: 'Times-Italic', value: 'Times-Italic'},
            {label: 'Times-BoldItalic', value: 'Times-BoldItalic'},
            {label: 'ZapfDingbats', value: 'ZapfDingbats'}
          ]
        }

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

  return (
    <div>
      <label className='field-label'>
        {
          props.global === 'pdf-fonts' ? 'Default Font' :
          props.global === 'pdf-watermarks' ? 'Watermark' :
          props.global === 'pdf-footer' ? 'Footer Layout' :
          'Header Layout'
        }
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