import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../error';

type inputValidationSchema = {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
};

export const useValidation =
  <Params, ResBody, ReqBody>({ body, params, query }: inputValidationSchema) =>
  (req: Request<Params, ResBody, ReqBody>, res: Response, next: NextFunction) => {
    if (body) {
      const validate = body.validate(req.body);
      if (validate?.error) {
        throw new CustomError(validate.error.details[0].message, 400);
      }
      req.body = validate.value;
    }

    if (params) {
      const validate = params.validate(req.params);
      if (validate?.error) {
        throw new CustomError(validate.error.details[0].message, 400);
      }
      req.params = validate.value;
    }

    if (query) {
      const validate = query.validate(req.query);
      if (validate?.error) {
        throw new CustomError(validate.error.details[0].message, 400);
      }
      req.query = validate.value;
    }

    next();
  };
