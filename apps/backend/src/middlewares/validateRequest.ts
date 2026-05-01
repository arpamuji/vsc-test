import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import type { RequestHandler } from 'express';
import type { z } from 'zod';

type RequestSchemas = {
  params?: z.ZodType;
  query?: z.ZodType;
  body?: z.ZodType;
};
type ValidationError = {
  source: 'params' | 'query' | 'body';
  path: string;
  message: string;
  code: string;
};

function formatZodErrors(error: z.ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
  }));
}

const validateRequest = (schemas: RequestSchemas): RequestHandler => {
  return (req, _res, next) => {
    const errors: Array<ValidationError> = [];

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);

      if (!result.success) {
        errors.push(
          ...formatZodErrors(result.error).map((error) => ({
            source: 'params' as const,
            ...error,
          }))
        );
      } else {
        req.params = result.data as any;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);

      if (!result.success) {
        errors.push(
          ...formatZodErrors(result.error).map((error) => ({
            source: 'query' as const,
            ...error,
          }))
        );
      } else {
        req.query = result.data as any;
      }
    }

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);

      if (!result.success) {
        errors.push(
          ...formatZodErrors(result.error).map((error) => ({
            source: 'body' as const,
            ...error,
          }))
        );
      } else {
        req.body = result.data as any;
      }
    }

    if (errors.length > 0) {
      return next(
        new AppError({
          statusCode: StatusCodes.BAD_REQUEST,
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed.',
          details: errors,
        })
      );
    }

    return next();
  };
};

export default validateRequest;
