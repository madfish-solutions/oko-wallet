import { deBankAccessKeyGuard, deBankApiUrlGuard } from './guards';
import { DeBankConfiguration } from './types';
export type { DeBankConfiguration } from './types';
export function getDeBankConfig(): DeBankConfiguration {
  return {
    API_URL: deBankApiUrlGuard(),
    ACCESS_KEY: deBankAccessKeyGuard()
  };
}
