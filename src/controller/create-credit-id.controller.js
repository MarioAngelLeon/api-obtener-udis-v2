import {
  ConsecutiveContractsEnum,
  DescriptionEnums,
  ProductNumbersEnum,
} from "../commons/enums";
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
import { Response } from "../commons/response";
import { DBConnection } from "../commons/typeorm-connection";
import { Valid } from "../commons/validator";
import { CreditIdEntity } from "../models/credit-id.entity";

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

const readCreditId = async (req, res) => {
  try {
    const productNumber = req?.params?.productNumber;
    if (!productNumber) {
      throw new NotFoundException(
        createMessageError("MAMBU.001", {}, `No product number provided`)
      );
    }

    const validation = Valid.ValidatorSchema.validate(
      { productNumber },
      Valid.ProductNumberValid
    );
    if (validation?.errors?.length) {
      handlerErrorValidation(validation);
    }

    let resp = await DBConnection.getRepository(CreditIdEntity)
      .createQueryBuilder("crid")
      .where("crid.is_active = :active", { active: true })
      .andWhere("crid.product_number = :product_number", {
        product_number: Number(productNumber),
      })
      .getOne();

    if (!resp) {
      throw new NotFoundException(
        createMessageError("MAMBU.001", {}, `Credit Id does not found`)
      );
    }

    return Response.Created(res, {
      msg: "Id read",
      product_number: resp?.product_number,
      credit_id: (resp?.consecutive_contract || 0) + 1,
      description: resp?.description,
    });
  } catch (error) {
    return handleBussinessError(res, error);
  }
};

const takeCreditId = async (req = request, res = response) => {
  try {
    const productNumber = req?.params?.productNumber;
    if (!productNumber) {
      throw new NotFoundException(
        createMessageError("MAMBU.001", {}, `No product number provided`)
      );
    }

    const validation = Valid.ValidatorSchema.validate(
      { productNumber },
      Valid.ProductNumberValid
    );
    if (validation?.errors?.length) {
      handlerErrorValidation(validation);
    }

    let resp = await DBConnection.getRepository(CreditIdEntity)
      .createQueryBuilder("crid")
      .where("crid.is_active = :active", { active: true })
      .andWhere("crid.product_number = :product_number", {
        product_number: Number(productNumber),
      })
      .getOne();

    if (!resp) {
      throw new NotFoundException(
        createMessageError("MAMBU.001", {}, `Credit Id does not found`)
      );
    }

    let updatedData = Object.assign(resp, {
      consecutive_contract: resp.consecutive_contract + 1,
    });
    let idSaved = await DBConnection.getRepository(CreditIdEntity).save(
      updatedData
    );

    return Response.Created(res, {
      msg: "Id taked",
      product_number: idSaved?.product_number,
      credit_id: idSaved?.consecutive_contract,
      description: idSaved?.description,
    });
  } catch (error) {
    return handleBussinessError(res, error);
  }
};

const loadInitialData = async () => {
  const dataExist = await DBConnection.getRepository(CreditIdEntity).find({});
  if (dataExist.length <= 0) {
    const initialData = [
      {
        id: 0,
        product_number: ProductNumbersEnum.personalCredit,
        consecutive_contract: ConsecutiveContractsEnum.personalCredit,
        description: DescriptionEnums.personalCredit,
        is_active: true,
      },
      {
        id: 0,
        product_number: ProductNumbersEnum.renovationCredit,
        consecutive_contract: ConsecutiveContractsEnum.renovationCredit,
        description: DescriptionEnums.renovationCredit,
        is_active: true,
      },
      {
        id: 0,
        product_number: ProductNumbersEnum.mortgage,
        consecutive_contract: ConsecutiveContractsEnum.mortgage,
        description: DescriptionEnums.mortgage,
        is_active: true,
      },
      {
        id: 0,
        product_number: ProductNumbersEnum.restructures,
        consecutive_contract: ConsecutiveContractsEnum.restructures,
        description: DescriptionEnums.restructures,
        is_active: true,
      },
      {
        id: 0,
        product_number: ProductNumbersEnum.lanave,
        consecutive_contract: ConsecutiveContractsEnum.lanave,
        description: DescriptionEnums.lanave,
        is_active: true,
      },
      {
        id: 0,
        product_number: ProductNumbersEnum.tunave,
        consecutive_contract: ConsecutiveContractsEnum.tunave,
        description: DescriptionEnums.tunave,
        is_active: true,
      },
    ];

    let initialDataCreated =
      DBConnection.getRepository(CreditIdEntity).create(initialData);
    await DBConnection.getRepository(CreditIdEntity).save(initialDataCreated);
    console.log("Los datos iniciales han sido cargados exitosamente.");
  } else {
    console.log("Los datos iniciales ya estan cargados");
  }
};

export const CreateCreditIdController = {
  readCreditId,
  takeCreditId,
  loadInitialData,
};
