import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { IMember } from "../../database/models/Member";
import { MemberProvider } from "../../database/providers/member";

interface IBodyProps extends Omit<IMember, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
        birthDay: yup.date().required(),
        cpf: yup.string().required(),
        address: yup.string().required()
    }))
}));

export const Create = async (req:Request, res:Response) => {
    
    const result = await MemberProvider.Create(req.body);

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