import process from 'process';

import { deBankAccessKeyGuard, deBankApiUrlGuard } from './guards';
import { DeBankConfiguration } from './types';
export type { DeBankConfiguration } from './types';
export function getDeBankConfig(env = process.env): DeBankConfiguration {
  return {
    API_URL: deBankApiUrlGuard(env),
    ACCESS_KEY: deBankAccessKeyGuard(env)
  };
}
