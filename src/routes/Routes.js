import express from "express";
import { GetUdisControllerController } from "../controller/get-udi.controller";

const routes = express.Router();

routes.get("/udis/:date", GetUdisControllerController.getUdis);

module.exports = routes;
