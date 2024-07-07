import { Field, Validate } from "payload/types";
import InputField from "./colorPickerField";
import Cell from "./colorPickerCell";

export const validateHexColor = (value: string = ''): true | string => {
  return value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/) !== null || `Please give a valid hex color`;
}

const colorField: Field = {
  name: 'color',
  type: 'text',
  validate: validateHexColor,
  required: true,
  admin: {
    components: {
      Field: InputField,
      Cell,
    }
  },
  defaultValue: '#000000'
};

export default colorField;