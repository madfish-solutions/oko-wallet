import { Browser, Page } from 'puppeteer';

import { getEnv } from '../utils/env.utils';

export const DEFAULT_SEED_PHRASE = getEnv('DEFAULT_SEED_PHRASE');
export const DEFAULT_PASSWORD = getEnv('DEFAULT_PASSWORD');
export const DEFAULT_HD_ACCOUNT_PRIVATE_KEY = getEnv('DEFAULT_HD_ACCOUNT_PRIVATE_KEY');
export const OLD_SEED_PHRASE = getEnv('OLD_SEED_PHRASE');

export class BrowserContext {
  public static browser: Browser;
  public static page: Page;
  public static seedPhrase = DEFAULT_SEED_PHRASE;
  public static oldSeedPhrase = OLD_SEED_PHRASE;
  public static password = DEFAULT_PASSWORD;
}
