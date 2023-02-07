import { NextFunction, Request, Response } from 'express';
import { CustomValidator, validationResult } from 'express-validator';

export const minMaxValidator =
  (min: number, max: number): CustomValidator =>
  value => {
    const toNum = Number(value);
    const bounds = toNum >= min && toNum <= max;
    if (!bounds) {
      return Promise.reject(`${toNum} out of bounds min: ${min}, max: ${max}`);
    }

    return toNum >= min && toNum <= max;
  };

export function validateRequestMiddleware(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send(result.mapped());
  }

  return next();
}
