import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { MemberProvider } from "../../database/providers/member";
import { ILend } from "../../database/models/Lend";
import { LendProvider } from "../../database/providers/lend";

interface IBodyProps extends Omit<ILend, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        date: yup.date().required(),
        status: yup.string().required(),
        memberId: yup.number().required(),
        bookId: yup.number().required()
    }))
}));

export const Create = async (req:Request, res:Response) => {
    
    const result = await LendProvider.Create(req.body);

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