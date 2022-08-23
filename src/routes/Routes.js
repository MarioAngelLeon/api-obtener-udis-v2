import express from "express";
import {createClientController} from '../controller/create.controller'

const routes = express.Router()

routes.post('/create' , createClientController.createClient)

module.exports = routes
