import { Field } from "payload/types";

export const pdfImageSize: Field[] = [
  {
    name: 'width',
    type: 'number',
    min: 10,
    defaultValue: 10,
    required: true
  },
  {
    name: 'height',
    type: 'number',
    min: 10,
    defaultValue: 10,
    required: true
  }
]