import { Request, Response } from "express";
import { CategoryProvider } from "../../database/providers/category";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';

interface IParamProps {  
    id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required()
    }))
}));


export const DeleteById = async (req:Request<IParamProps>, res:Response) => {
    
    if(!req.params.id){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: 'O parâmetro id é obrigatório!'
            }
        });
        return;
    }

    const result = await CategoryProvider.DeleteById(req.params.id);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    res.status(StatusCodes.NO_CONTENT).json();
};