import { DataSource } from "typeorm";
import { CreditIdEntity } from "../models/credit-id.entity";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASS,
  DB_PORT,
  DB_SYNC,
  DB_TYPE,
  DB_USER,
} from "./Constants";

export const DBConnection = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  synchronize: (DB_SYNC || "").toUpperCase() === "TRUE",
  entities: [CreditIdEntity],
});
