import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function validateRequestMiddleware(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send(result.mapped());
  }

  return next();
}
