import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';

const notFound: RequestHandler = (req, res, next) => {
  next(
    new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'NOT_FOUND',
      message: 'The requested resource was not found.',
    })
  );
};

export default notFound;
