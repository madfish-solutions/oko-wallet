import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string) => process.env[key] ?? '';

export const DEFAULT_HD_ACCOUNT_SEED_PHRASE = getEnv('DEFAULT_HD_ACCOUNT_SEED_PHRASE');
export const DEFAULT_PASSWORD = getEnv('DEFAULT_PASSWORD');
export const DEFAULT_HD_ACCOUNT_FIRST_PRIVATE_KEY = getEnv('DEFAULT_HD_ACCOUNT_FIRST_PRIVATE_KEY');
export const SEED_PHRASE_FOR_IMPORT = getEnv('SEED_PHRASE_FOR_IMPORT');
export const IMPORTED_BY_SEED_PUBLIC_KEY = getEnv('IMPORTED_BY_SEED_PUBLIC_KEY');
export const IMPORTED_BY_PRIVATE_KEY_PRIVATE_KEY = getEnv('IMPORTED_BY_PRIVATE_KEY_PRIVATE_KEY');
export const IMPORTED_BY_PRIVATE_KEY_PUBLIC_KEY = getEnv('IMPORTED_BY_PRIVATE_KEY_PUBLIC_KEY');
