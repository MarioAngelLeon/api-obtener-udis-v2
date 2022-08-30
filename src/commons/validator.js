import { Validator } from "jsonschema";

const ValidatorSchema = new Validator();

const addClient = {
  id: "/cliente",
  type: "object",
  properties: {
    identificación: {
      type: "number",
      required: true,
    },
    nombre: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    segundoNombre: {
      type: "string",
      maxLength: 50,
      required: false,
    },
    apellidoPaterno: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    apellidoMaterno: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    tipoCliente: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    idioma: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    idClienteFinanciera: {
      type: "number",
      required: true,
    },
    telefono: {
      type: "number",
      maxLength: 10,
      minLength: 10,
      required: false,
    },
    correo: {
      type: "string",
      maxLength: 50,
      required: false,
    },
    idCentroBeneficio: {
      type: "number",
      required: true,
    },
  },
};

const ProductNumberValid = {
  id: "/credit/:productNumber",
  type: "object",
  properties: {
    productNumber: {
      type: "string",
      pattern: /^[0-9]+$/,
      description:
        "Use regex to validate this string as a series of one or more digits",
      required: true,
    },
  },
};

ValidatorSchema.addSchema(addClient, "/cliente");
ValidatorSchema.addSchema(ProductNumberValid, "/credit/:productNumber");

export const Valid = {
  ValidatorSchema,
  addClient,
  ProductNumberValid,
};
