/* eslint-disable no-async-promise-executor */
import axios from 'axios'
import https from 'https'
import {
  HTTP_REQUEST_TIMEOUT,
  HTTP_REQUEST_REJECT_UNAUTHORIZED
} from '../commons/Constants'

//import LOG from '../commons/logger'

const baseConfig = {
  timeout: HTTP_REQUEST_TIMEOUT
}

const get = (url, params, headers, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = { ...baseConfig }
      if (headers) {
        config.headers = headers
      }
      const instance = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: HTTP_REQUEST_REJECT_UNAUTHORIZED
        })
      })
    //  LOG.debugJSON(`Making GET request to: ${url} - Config`, config)
      const response = await instance.get(url, config)
    //  LOG.debugJSON('Response', response.data)
      resolve(response.data)
    } catch (error) {
    //  LOG.error(`Error on request ${url} - message: ${error.message}`)
      if (options.isResolve) {
        resolve({ error: error.message })
      } else {
        reject(error)
      }
    }
  })

const post = (url, body, headers, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = { ...baseConfig }
      if (headers) {
        config.headers = headers
      }
      const instance = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: HTTP_REQUEST_REJECT_UNAUTHORIZED
        })
      })
    //  LOG.debugJSON(`Making POST request to: ${url} - Body`, body)
    //  LOG.debugJSON('Config', config)
      const response = await instance.post(url, body, config)
    //  LOG.debugJSON('Response', response.data)
      resolve(response.data)
    } catch (error) {
    //  LOG.error(`Error on request ${url} - message: ${error.message}`)
      if (options.isResolve) {
        resolve({ error: error.message })
      } else {
        reject(error)
      }
    }
  })

const put = (url, body, headers, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = { ...baseConfig }
      if (headers) {
        config.headers = headers
      }
      const instance = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: HTTP_REQUEST_REJECT_UNAUTHORIZED
        })
      })
      //LOG.debugJSON(`Making PUT request to: ${url},  Body`, body)
     // LOG.debugJSON('Config', config)
      const response = await instance.put(url, body, config)
     // LOG.debugJSON('Response', response.data)
      resolve(response.data)
    } catch (error) {
     // LOG.error(`Error on request ${url} - message: ${error.message}`)
      if (options.isResolve) {
        resolve({ error: error.message })
      } else {
        reject(error)
      }
    }
  })

export const HttpService = {
  get,
  post,
  put
}

export default null
