import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { CategoryProvider } from "../../database/providers/category";
import { IBook } from "../../database/models/Book";
import { BookProvider } from "../../database/providers/book";

interface IBodyProps extends Omit<IBook, 'id'> {}

interface IParamProps {
  id?: number;
}

export const UpdateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
        name: yup.string().required(),
        author: yup.string().required(),
        publisher: yup.string().required(),
        yearOfPublication: yup.number().required(),
        photo: yup.string().required(),
        location: yup.string().required(),
        description: yup.string().required(),
        categoryId: yup.number().required()
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

  const result = await BookProvider.UpdateById(Number(req.params.id), req.body);

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