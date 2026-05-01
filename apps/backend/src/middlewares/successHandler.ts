import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';

type ApiSuccessResponse<T = unknown> = {
  success: true;
  message: string;
  data: T | null;
  meta?: Record<string, unknown>;
  timestamp: string;
};

const successHandler: RequestHandler = (req, res, next) => {
  res.success = function success<T = unknown>({
    statusCode = StatusCodes.OK,
    message = 'OK',
    data = null as T,
    meta,
  }: {
    statusCode?: StatusCodes;
    message?: string;
    data?: T;
    meta?: Record<string, unknown>;
  } = {}) {
    const response: ApiSuccessResponse<T> = {
      success: true,
      message,
      data,
      meta,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  };

  next();
};

export default successHandler;
