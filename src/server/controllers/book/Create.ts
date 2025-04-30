import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { IBook } from "../../database/models/Book";
import { BookProvider } from "../../database/providers/book";

interface IBodyProps extends Omit<IBook, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        author: yup.string().required(),
        publisher: yup.string().required(),
        yearOfPublication: yup.number().required(),
        photo: yup.string().required(),
        location: yup.string().required(),
        description: yup.string().required(),
        categoryId: yup.number().required()
    }))
}));

export const Create = async (req:Request, res:Response) => {
    const result = await BookProvider.Create(req.body);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    res.status(StatusCodes.CREATED).json(result);
};