import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { ILend } from "../../database/models/Lend";
import { LendProvider } from "../../database/providers/lend";

interface IBodyProps extends Omit<ILend, 'id'> {}

interface IParamProps {
  id?: number;
}

export const UpdateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      date: yup.date().required(),
      status: yup.string().required(),
      memberId: yup.number().required(),
      bookId: yup.number().required()
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

  const result = await LendProvider.UpdateById(Number(req.params.id), req.body);

  if (result instanceof Error) {
      if (result.message === 'Usuário não encontrado') {
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