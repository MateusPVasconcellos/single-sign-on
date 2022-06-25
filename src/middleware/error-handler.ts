import { NextFunction, Request, Response } from 'express';
import { BusinessException } from '../execption/business-exception';

export const errorHandler = function (
  e: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (e instanceof BusinessException) {
    return response.status(e.statusCode).json({
      status: 'error',
      message: e.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
