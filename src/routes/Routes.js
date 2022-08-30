import express from "express";
import { CreateCreditIdController } from "../controller/create-credit-id.controller";

const routes = express.Router();

routes.get("/credit/:productNumber", CreateCreditIdController.readCreditId);
routes.post("/credit/:productNumber", CreateCreditIdController.takeCreditId);

module.exports = routes;
