export class BadRequestException {
    constructor(message) {
      this.name = 'Bad Request'
      this.statusCode = message.statusCode
      this.message = message.message
      this.mergeVariables = message.mergeVariables
      this.stack = new Error().stack
    }
  }

  export class NotFoundException {
    constructor(message) {
      this.name = 'Not Found'
      this.statusCode = message.statusCode
      this.mergeVariables = message.mergeVariables
      this.message = message.message
      this.stack = new Error().stack
    }
  }

  export class ConflictException {
    constructor(message) {
      this.name = 'Conflict'
      this.statusCode = message.statusCode
      this.message = message.message
      this.mergeVariables = message.mergeVariables
      this.stack = new Error().stack
    }
  }
  
  export class InternalServerException {
    constructor(message) {
      this.name = 'Internal Server Error'
      this.statusCode = message.statusCode
      this.message = message.message
      this.mergeVariables = message.mergeVariables
      this.stack = new Error().stack
    }
  }
  
  export class BussinessException {
    constructor(message) {
      this.name = 'Bussiness Error'
      this.statusCode = message.statusCode
      this.message = message.message
      this.mergeVariables = message.mergeVariables
      this.stack = new Error().stack
    }
  }
  
  export class CommonException {
    constructor(message) {
      this.name = 'Internal Server Error'
      this.statusCode = message.statusCode
      this.message = message.message
      this.mergeVariables = message.mergeVariables
      this.stack = new Error().stack
      this.responseBody = message.responseBody
    }
  }

  export class NotContentException {
    constructor(message) {
      this.name = 'Not Content'
      this.statusCode = message.statusCode
      this.message = message.message
      this.mergeVariables = message.mergeVariables
      this.stack = new Error().stack
    }
  }

  export const createMessageError = (
    statusCode,
    mergeVariables,
    message,
    responseBody
  ) => ({
    statusCode,
    mergeVariables: mergeVariables || {},
    message,
    responseBody
  })