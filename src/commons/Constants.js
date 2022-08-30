// Operation Code
export const CODE_CREATED = "NMP.201";
export const ERROR_BRANCH_INACTIVE = "El centro de beneficios esta inactivo";

export const GLOB = {
  PORT: process.env.PORT || 3001,
  CONTEXT_NAME: process.env.CONTEXT_NAME || "api",
  VERSION: process.env.VERSION || "v1",
  BASIC_MAMBU: process.env.BASIC_MAMBU || "TWxlb246RGljaTNtYnIzMjAyMQ==",
};

export const {
  env: {
    DB_TYPE = "mysql",
    DB_HOST = "localhost",
    DB_PORT = 3306,
    DB_USER = "root",
    DB_PASS = "Chemaesmipastor.1",
    DB_DATABASE = "mangosta2",
    DB_SYNC = "false",
  },
} = process;

export const SERVICE_DOMAINS = {
  DOMAIN_MAMBU: process.env.DOMAIN_MAMBU || "https://m775p.sandbox.mambu.com",
};

export const HTTP_REQUEST_TIMEOUT = Number.parseInt(
  process.env.HTTP_REQUEST_TIMEOUT,
  10
);

export const HTTP_REQUEST_REJECT_UNAUTHORIZED =
  process.env.HTTP_REQUEST_REJECT_UNAUTHORIZED === "true";
