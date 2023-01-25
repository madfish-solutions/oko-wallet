import { DEBANK_API_URL } from './constants';

export const deBankAccessKeyGuard = (): string => {
  if (!process.env['DEBANK_ACCESS_KEY']) {
    throw new Error('DEBANK_ACCESS_KEY not defined');
  }
  return String(process.env['DEBANK_ACCESS_KEY']);
};

export const deBankApiUrlGuard = (): string => String(process.env['DEBANK_API_URL'] ?? DEBANK_API_URL);
