import {Valid} from '../commons/validator'
import {handlerErrorValidation} from '../commons/errors/message.mapping'
import {Response} from '../commons/response'
import handlerError from '../commons/errors/handler-error'
import { BussinessException } from '../commons/errors/exceptions'
import { getBranch,createClientMambu,updateClientMambu } from '../service/mambu/mambu.service'
import {insertClient} from '../commons/mysql'




const handleBussinessError = (res, err) =>
  handlerError(
    res,
    new BussinessException({
      message: err.message || 'Error de ejecución',
      mergeVariables: err.mergeVariables,
      stack: err.stack,
      statusCode:err.statusCode
    })
  )

const createClient = async (req,res) =>{
    
    try{
        const {body} = req
        // valida el json del request
        const validation = Valid.ValidatorSchema.validate(
        body,
        Valid.addClient
        )
        
        if(validation.errors.length){
          handlerErrorValidation(validation)
        }

        const existClient = false;
        //**************falta el paso para validar si el cliente existe */

      
        //id que se recibe del centro del beneficio de financiera
        //*********************validar si se ira a mambu o a un catalogo en bd */
        const idBranch = body.idCentroBeneficio
        //obtiene el id de mambu para centro de beneficio
        const idBranchMambu = await getBranch(idBranch)
        // Existe el centro de beneficios y la peticicion es correcta,
        //por lo que se creara al cliente en mambu

        const dateOperation = new Date()
        
        if(existClient){
          
          //actualiza cliente en mambu
          const client = await updateClientMambu(body,idBranchMambu)
          //falta logica para update en bd que aun no se tiene definido
        }else{
          //crea cliente en mambu
          const client = await createClientMambu(body,idBranchMambu,{})
          // guardara toda la informacion en la BD
          //*****************se comenta conexion a mysql ya que se cambiara bd */
        /*    var moment = require('moment')

        const insert = await  insertClient(body.idClienteFinanciera,client.encodedKey,client.state,
                                            moment(client.creationDate).format('YYYY-MM-DD hh:mm:ss'),
                                            moment(client.lastModifiedDate).format('YYYY-MM-DD hh:mm:ss'),
                                            moment(client.approvedDate).format('YYYY-MM-DD hh:mm:ss'),
                                            moment(dateOperation).format('YYYY-MM-DD hh:mm:ss'),
                                            1)*/
        }

                                     
       return Response.Created(res,{"idMambu":client.encodedKey})
        
    }catch(err){
        return handleBussinessError(res, err)
    }      
}

export const createClientController = {
    createClient
}