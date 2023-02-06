import axios from 'axios';
import { Query } from 'express-serve-static-core';

import config from '../../../config';

const deBankRequest = axios.create({
  baseURL: config.DEBANK.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    AccessKey: config.DEBANK.ACCESS_KEY
  }
});

export async function proxyDeBankRequest<ReqT, ResV>(method: string, queryParams: Query): Promise<ResV> {
  const params = <ReqT>queryParams;

  return deBankRequest.get<ResV>(`v1/${method}`, { params }).then(response => response.data);
}
