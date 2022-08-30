import moment from "moment";
import {
  BadRequestException,
  BussinessException,
  ConflictException,
  createMessageError,
  InternalServerException,
  NotContentException,
  NotFoundException,
} from "../commons/errors/exceptions";
import handlerError from "../commons/errors/handler-error";
import { handlerErrorValidation } from "../commons/errors/message.mapping";
import { formatDate } from "../commons/helpers/formDate";
import { Response } from "../commons/response";
import { DBConnection } from "../commons/typeorm-connection";
import { Valid } from "../commons/validator";
import { UdiEntity } from "../models/udi.entity";

const handleBussinessError = (res, err) => {
  if (
    err instanceof BadRequestException ||
    err instanceof NotFoundException ||
    err instanceof ConflictException ||
    err instanceof BussinessException ||
    err instanceof NotContentException
  ) {
    handlerError(res, err);
  } else {
    handlerError(
      res,
      new InternalServerException({
        message: err.message || "Ocurrio un error inesperado",
        mergeVariables: err.mergeVariables,
        stack: err.stack,
        statusCode: err.statusCode || "NMP.500",
      })
    );
  }
};

const getUdis = async (req, res) => {
  try {
    let msg = "";
    const date = req?.params?.date;
    if (!date) {
      throw new NotFoundException(
        createMessageError("MAMBU.001", {}, `No date provided`)
      );
    }

    const validation = Valid.ValidatorSchema.validate(
      { date },
      Valid.dateValidator
    );
    if (validation?.errors?.length) {
      handlerErrorValidation(validation);
    }

    let resp = await DBConnection.getRepository(UdiEntity)
      .createQueryBuilder("udi")
      .where("udi.is_active = :active", { active: true })
      .andWhere("udi.date = :date", { date: new Date(date) })
      .getOne();

    if (!resp) {
      resp = await DBConnection.getRepository(UdiEntity)
        .createQueryBuilder("udi")
        .where("udi.is_active = :active", { active: true })
        .orderBy("udi.date", "DESC")
        .getOne();
    }

    let foundDate = moment(new Date(resp?.date));
    let searchDate = moment(new Date(date));

    if (foundDate.isSame(searchDate)) {
      msg = "Udi por fecha encontrada exitosamente";
    } else if (foundDate < searchDate) {
      msg = "Udi por fecha más cercana";
    } else if (foundDate > searchDate) {
      let message = {
        msg: "No se encontro el valor para la fecha solicitada",
        date: formatDate(new Date(date)),
      };
      throw new NotFoundException(createMessageError("MAMBU.001", {}, message));
    }

    if (!resp) {
      throw new NotFoundException(
        createMessageError("MAMBU.001", {}, `Las UDIs no han sido cargadas`)
      );
    }

    return Response.Created(res, {
      msg,
      fecha: formatDate(resp?.date),
      dato: resp?.dato,
    });
  } catch (error) {
    return handleBussinessError(res, error);
  }
};

export const GetUdisControllerController = { getUdis };
