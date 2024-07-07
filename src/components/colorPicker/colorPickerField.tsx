import React from 'react'
import { useFieldType } from 'payload/components/forms';
import { Label } from 'payload/components/forms';
import Error from 'payload/dist/admin/components/forms/Error/index';
import { Props } from 'payload/components/fields/Text';
import { validateHexColor } from './config';
import { ColorPicker } from 'primereact/colorpicker'
import './styles.scss';

const baseClass = 'custom-color-picker';

const ColorPickerField: React.FC<Props> = (props) => {
  const {
    path,
    label,
    required,
    validate,
  } = props;
  const p = path ? path : ''
  const {
    value = "#000000",
    setValue,
    errorMessage,
    showError,
  } = useFieldType({
    path: p,
    validate,
  });

  const classes = ["field-type", "text", baseClass, showError && "error"]
    .filter(Boolean)
    .join(" ");

  React.useEffect(()=>{
    setValue(value)
  })

  return (
    <div className={classes}>
      <Label
        htmlFor={path}
        label={label}
        required={required}
      />
      <Error showError={showError} message={errorMessage ? errorMessage : ''} />
      <ColorPicker
        format="hex"
        value={(`${value}`.substring(1))}
        onChange={(e) => {
          validateHexColor(`#${e.value}`)
          setValue(`#${e.value}`)}
        }
        width={"30"}
        />
    </div>
  )
};
export default ColorPickerField;