import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { UserProvider } from "../../database/providers/user";

interface IQueryProps{
  page?: number;
  limit?: number;
}

export const GetAll = async (req:Request<{}, {}, {}, IQueryProps>, res:Response)=> {

    const result = await UserProvider.GetAll(req.query.limit || 10, req.query.page || 1);

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