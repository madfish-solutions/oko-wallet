import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string) => process.env[key] ?? '';

export const DEFAULT_SEED_PHRASE = getEnv('DEFAULT_SEED_PHRASE');
export const DEFAULT_PASSWORD = getEnv('DEFAULT_PASSWORD');
export const DEFAULT_HD_ACCOUNT_PRIVATE_KEY = getEnv('DEFAULT_HD_ACCOUNT_PRIVATE_KEY');
export const SEED_PHRASE_FOR_IMPORT = getEnv('SEED_PHRASE_FOR_IMPORT');
export const PRIVATE_KEY_FOR_IMPORT = getEnv('PRIVATE_KEY_FOR_IMPORT');
