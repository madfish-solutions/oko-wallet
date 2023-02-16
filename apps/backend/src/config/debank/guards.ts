import process from 'process';

import { DEBANK_API_URL } from './constants';

export const deBankAccessKeyGuard = (env = process.env): string => {
  if (!('DEBANK_ACCESS_KEY' in env)) {
    throw new Error('DEBANK_ACCESS_KEY not defined');
  }

  return String(env.DEBANK_ACCESS_KEY);
};

export const deBankApiUrlGuard = (env = process.env): string => String(env.DEBANK_API_URL ?? DEBANK_API_URL);
