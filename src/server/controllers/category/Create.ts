import { Request, Response } from "express";
import { CategoryProvider } from "../../database/providers/category";
import { StatusCodes } from "http-status-codes";
import { ICategory } from "../../database/models/Category";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';

interface IBodyProps extends Omit<ICategory, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required()
    }))
}));

export const Create = async (req:Request, res:Response) => {
    const result = await CategoryProvider.Create(req.body);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    res.status(StatusCodes.CREATED).json(result);
};