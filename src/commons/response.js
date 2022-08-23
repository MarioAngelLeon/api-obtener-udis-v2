import _ from 'lodash'
import { CODE_CREATED } from "./Constants"
import {MESSAGES} from './messages'


const Created = (res, data) => {
    const statusCode = 201
    return createResponse(res, statusCode, data, CODE_CREATED)
}

const createResponse = (res, statusCode, data = {}, code = '') => {
    let info = null
  
    if (code !== '') {
      const { template: status, description: message } = _.get(MESSAGES, code)
      info = { code, status, message }
    }
  
    const result = info ? { ...data, info } : data
    return res.status(statusCode).send(result)
}

export const Response ={
    Created,
    createResponse
}

export default null