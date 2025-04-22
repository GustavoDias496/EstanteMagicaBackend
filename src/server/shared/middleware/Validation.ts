import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TPropety = "body" | "header" | "params" | "query";
type TGetSchema = <T>(schema: Schema<T>) => Schema<any>;
type TAllSchemas = Record<TPropety, Schema<any>>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TPropety], {
          abortEarly: false,
        });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (!error.path) return;
          errors[error.path] = error.message;
        });

        errorsResult[key] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      next();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
  };