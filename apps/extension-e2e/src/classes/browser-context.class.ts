import { Browser, Page } from 'puppeteer';

export const DEFAULT_SEED_PHRASE = 'wrong bomb accident maze garden brass cause endless sausage twice thing engine';
export const DEFAULT_PASSWORD = 'Aa123456';
export const DEFAULT_HD_ACCOUNT = '0xc0fde2c769da79b73d7caebe7b195362a4195f0984e81fba7f979d9de36f3b0d';

export class BrowserContext {
  public static browser: Browser;
  public static page: Page;
  public static seedPhrase = DEFAULT_SEED_PHRASE;
  public static password = DEFAULT_PASSWORD;
}
