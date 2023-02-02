import { IncomingHttpHeaders } from 'http';

import { DeBankConfiguration } from '../../../config';

export function formDeBankHeaderWithKey(config: DeBankConfiguration): IncomingHttpHeaders {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    AccessKey: config.ACCESS_KEY
  };

  return headers;
}
