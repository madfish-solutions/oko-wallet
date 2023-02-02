import { NextFunction } from 'express';
import { Query } from 'express-serve-static-core'

import { deBankRequest } from './request';

export async function proxyDeBankRequest<T>(method: string, params: Query, next: NextFunction): Promise<T | void> {
  return deBankRequest
    .get<T>(`v1/${method}`, { params })
    .then(response => response.data)
    .catch(next);
}
