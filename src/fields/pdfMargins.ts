import { Field } from "payload/types";

export const pdfMargins: Field[] = [
  {
    name: 'horizontalMargin',
    type: 'number',
    min: 0,
    defaultValue: 10
  },
  {
    name: 'verticalMargin',
    type: 'number',
    min: 0,
    defaultValue: 5
  }
]