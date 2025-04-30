import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { BookProvider } from '../../database/providers/book';

interface IParamProps{
    id?: number;
}

export const GetByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer(),
  })),
}));

export const GetById = async (req:Request<IParamProps>, res:Response) => {
    
    if(!req.params.id){
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parametro id é obrigatório.'
            }
        });
    }

    const result = await BookProvider.GetById(Number(req.params.id));

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