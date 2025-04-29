import { Request, Response } from "express";
import { CategoryProvider } from "../../database/providers/category";
import { StatusCodes } from "http-status-codes";

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