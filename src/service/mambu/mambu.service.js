import {SERVICE_DOMAINS,GLOB} from '../../commons/Constants'
import {HttpService} from '../http.service'
import { ERROR_BRANCH_INACTIVE } from '../../commons/Constants'
import { createMessageError,BadRequestException } from '../../commons/errors/exceptions'

const header = {
    'Accept': 'application/vnd.mambu.v2+json',
    'Authorization': `basic ${GLOB.BASIC_MAMBU}`,
    'Content-Type': 'application/json'
}

const getBranch= async(id) =>{
    try{       
        // obtiene valor del centro de beneficios
        const branch = await HttpService.get(
            `${SERVICE_DOMAINS.DOMAIN_MAMBU}/api/branches/${id}`,
            undefined,
            header
        );
        if(branch.state === 'ACTIVE'){
            return branch.encodedKey    
        }
        
        throw new BadRequestException(createMessageError('MAMBU.001',{},ERROR_BRANCH_INACTIVE ))

    }catch(err){
        console.log(err.response.data.errors[0].errorCode)
        throw new BadRequestException(createMessageError('MAMBU.001',{},err.response.data.errors[0].errorReason ))   
    }
}

const createClientMambu = async(body, idBranchMambu) => {
    try{    
        const bodyMambu = {
            preferredLanguage: body.idioma,
            id: body.idClienteFinanciera,
            firstName: body.primerNombre,
            lastName: body.apellidoPaterno,
            assignedBranchKey: idBranchMambu		
        }

         const clientMambu = await HttpService.post(
            `${SERVICE_DOMAINS.DOMAIN_MAMBU}/api/clients`,
            bodyMambu,
            header
        )
        return clientMambu   
    }catch(e){
      
        throw new BadRequestException(createMessageError('MAMBU.002',{},
        e.response.data.errors[0].errorReason ))   
    }
}



const updateClientMambu = async(body, idBranchMambu,idMambu) => {
    try{    
        const bodyMambu = {
            preferredLanguage: body.idioma,
            id: body.idClienteFinanciera,
            firstName: body.primerNombre,
            lastName: body.apellidoPaterno,
            assignedBranchKey: idBranchMambu,
            encodedKey:idMambu		
        }

         const clientMambu = await HttpService.put(
            `${SERVICE_DOMAINS.DOMAIN_MAMBU}/api/clients/${idClienteFinanciera}`,
            bodyMambu,
            header
        )
        return clientMambu   
    }catch(e){
      
        throw new BadRequestException(createMessageError('MAMBU.002',{},
        e.response.data.errors[0].errorReason ))   
    }
}



module.exports = {
    getBranch,
    createClientMambu,
    updateClientMambu
}


        
