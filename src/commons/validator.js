import { Validator } from "jsonschema";

const ValidatorSchema = new Validator();

const dateValidator = {
  id: "/udis/:date",
  type: "object",
  properties: {
    date: {
      type: "string",
      pattern: /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
      description:
        "Use regex to validate one date",
      required: true,
    },
  },
};

ValidatorSchema.addSchema(dateValidator, "/udis/:date");

export const Valid = {
  ValidatorSchema,
  dateValidator,
};
