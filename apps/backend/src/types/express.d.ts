import type { Response } from 'express';

export type SuccessResponseOptions<T = unknown> = {
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
};

declare global {
  namespace Express {
    interface Response {
      success: <T = unknown>(options?: SuccessResponseOptions<T>) => Response;
    }
  }
}
