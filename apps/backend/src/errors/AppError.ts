import { StatusCodes } from 'http-status-codes';

export type AppErrorOptions = {
  statusCode?: number;
  code?: string;
  message: string;
  details?: unknown;
  isOperational?: boolean;
};

class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details: unknown;
  public readonly isOperational: boolean;

  constructor(options: AppErrorOptions) {
    super(options.message || 'An unexpected error occurred.');
    this.statusCode = options.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    this.code = options.code ?? 'INTERNAL_SERVER_ERROR';
    this.details = options.details ?? null;
    this.isOperational = options.isOperational ?? true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
