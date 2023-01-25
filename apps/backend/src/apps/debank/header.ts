import { DeBankConfiguration } from '../../config/debank';
import { IncomingHttpHeaders } from 'http';

export function formDeBankHeaderWithKey(config: DeBankConfiguration): IncomingHttpHeaders {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    AccessKey: config.ACCESS_KEY
  };
  return headers;
}
