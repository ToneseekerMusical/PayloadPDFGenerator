import React, { useEffect, useState, useCallback, Fragment } from 'react'

// this is how we'll interface with Payload itself
import { useFieldType } from 'payload/components/forms';

// retrieve and store the last used colors of your users
import { usePreferences } from 'payload/components/preferences';

// re-use Payload's built-in button component
import { Button } from 'payload/components';

// we'll re-use the built in Label component directly from Payload
import { Label } from 'payload/components/forms';

import Error from 'payload/dist/admin/components/forms/Error/index';

// we can use existing Payload types easily
import { Props } from 'payload/components/fields/Text';

// we'll import and reuse our existing validator function on the frontend, too
import { validateHexColor } from './config';

import { ColorPicker } from 'primereact/colorpicker'

// Import the SCSS stylesheet
import './styles.scss';

// keep a list of default colors to choose from

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
    value = "",
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