import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { CategoryProvider } from "../../database/providers/category";
import { ICategory } from "../../database/models/Category";

interface IBodyProps extends Omit<ICategory, 'id'> {}

interface IParamProps {
  id?: number;
}

export const UpdateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3)
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().integer(),
    })
  ),
}));

export const UpdateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({
          errors: {
              default: 'O parâmetro "id" é obrigatório.',
          },
      });
      return;
  }

  const result = await CategoryProvider.UpdateById(Number(req.params.id), req.body);

  if (result instanceof Error) {
      if (result.message === 'Categoria não encontrada') {
          res.status(StatusCodes.NOT_FOUND).json({
              errors: {
                  default: result.message,
              },
          });
          return;
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
              default: result.message,
          },
      });
      return;
  }

  res.status(StatusCodes.NO_CONTENT).json();
};