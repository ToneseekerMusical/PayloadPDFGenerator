import { Field } from "payload/types";
import { FieldSelectComponent } from "./component";

export const FieldSelectField: Field = {
  name: "customHasManySelectField",
  type: "text",
  admin: {
    components: {
      Field: FieldSelectComponent,
    },
  },
  hooks: {
    beforeValidate: [
      async ({ value }) => {
        // convert the array to string since this is a text field
        const stringifiedValue = JSON.stringify(value);
        return stringifiedValue;
      },
    ],
  },
};