import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { LendProvider } from "../../database/providers/lend";

interface IQueryProps{
  page?: number;
  limit?: number;
}

export const GetAllValidation = validation((getSchema) => ({
  params: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
  })),
}));

export const GetAll = async (req:Request<{}, {}, {}, IQueryProps>, res:Response)=> {

    const result = await LendProvider.GetAll(req.query.limit || 10, req.query.page || 1);

    if(result instanceof Error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message
        }
      });
      return;
    }

  res.status(StatusCodes.OK).json(result);
};