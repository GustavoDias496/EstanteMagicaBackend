import { Request, Response } from "express";
import { UserProvider } from "../../database/providers/user";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../../database/models/Users";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';

interface IBodyProps extends Omit<IUser, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
    }))
}));

export const Create = async (req:Request, res:Response) => {
    
    const result = await UserProvider.Create(req.body);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
        return;
    }

    res.status(StatusCodes.CREATED).json(result);
};