import { NextFunction } from 'express';

import { deBankRequest } from './request';

export async function proxyDeBankRequest<T>(method: string, params: any, next: NextFunction): Promise<T | void> {
  return deBankRequest
    .get<T>(`v1/${method}`, { params })
    .then(response => response.data)
    .catch(next);
}
