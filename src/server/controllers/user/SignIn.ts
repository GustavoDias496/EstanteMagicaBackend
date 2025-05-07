import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models/Users";
import * as yup from "yup";
import { UserProvider } from "../../database/providers/user";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IUser, "id" | "name"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
    })
  ),
}));

export const SignIn = async ( req: Request<{}, {}, IBodyProps>, res: Response ) => {
  
  const { email, password } = req.body;

  const result = await UserProvider.SignIn(email, password);

  if (result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos!",
      },
    });
    return;
  }

  res.status(StatusCodes.OK).json({
    success: true,
    accessToken: result,
  });
};
