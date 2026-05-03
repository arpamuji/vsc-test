import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';

type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    stack?: string;
  };
  timestamp: string;
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const isProduction = process.env['NODE_ENV'] === 'production';

  let error: AppError;

  if (err instanceof AppError) {
    error = err;
  } else {
    error = new AppError({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      message: isProduction ? 'An unexpected error occurred.' : err.message,
      details: isProduction ? null : err.stack,
      isOperational: false,
    });
  }

  const response: ErrorResponse = {
    success: false,
    error: {
      code: error.code,
      message: error.message,
    },
    timestamp: new Date().toISOString(),
  };

  if (!isProduction && error.details) {
    response.error.details = error.details;
  }

  if (!isProduction && error.stack) {
    response.error.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};

export default errorHandler;
