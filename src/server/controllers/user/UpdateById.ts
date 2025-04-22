import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../../database/models/Users";
import { validation } from "../../shared/middleware";
import { UserProvider } from "../../database/providers/user";

interface IBodyProps extends Omit<IUser, 'id'> {}

interface IParamProps {
  id?: number;
}

export const UpdateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().email().required(),
      password: yup.string().required().min(8)
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

  const result = await UserProvider.UpdateById(Number(req.params.id), req.body);

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