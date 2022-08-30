import _ from "lodash";
import { Response } from "../response";
import {
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerException,
  BussinessException,
  NotContentException,
  CommonException,
} from "./exceptions";
import { MESSAGES } from "../messages";

module.exports = (res, e) => {
  let hasStatusCode = true;
  let code = -1;
  if (e instanceof BadRequestException) code = 400;

  if (e instanceof NotFoundException) code = 404;

  if (e instanceof ConflictException) code = 409;

  if (e instanceof InternalServerException) code = 500;

  if (e instanceof BussinessException) code = 500;

  if (e instanceof NotContentException) code = 204;

  if (e instanceof CommonException) hasStatusCode = false;

  const { statusCode, mergeVariables, message } = e;
  if (!hasStatusCode) {
    //LOG.debug(`StatusCode: ${statusCode}, message: ${message}`)

    return Response.createResponse(res, statusCode, message);
  }
  const { template, description } = _.get(MESSAGES, statusCode);

  //LOG.debug(`${template}`)
  const compiled = _.template(template);

  //  LOG.debugJSON(`message: ${message}, mergeVariables`, mergeVariables)

  return Response.createResponse(res, code, {
    statusCode,
    message: compiled(
      mergeVariables && mergeVariables.message ? mergeVariables : { message }
    ),
    description,
  });
};
