import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {GLOB} from './commons/Constants'
import routes from './routes/Routes'
//import LOG from './commons/logger'
import cfenv from 'cfenv'
import {connection} from './commons/mysql'

const appEnv = cfenv.getAppEnv()

const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200
 }

 const app = express() 
 const swaggerUi = require('swagger-ui-express'),
   swaggerDocument = require ('../swagger.json');


 app.use(cors(corsOptions))
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
 app.use(`/${GLOB.CONTEXT_NAME}/${GLOB.VERSION}/`, routes)

 app.use(
   '/api-docs',
   swaggerUi.serve, 
   swaggerUi.setup(swaggerDocument)
 );

 app.listen(GLOB.PORT,appEnv.bind,() =>{
    console.log(GLOB.PORT)
    connection   
 })

 module.exports = app