import { Browser, Page } from 'puppeteer';

const DEFAULT_SEED_PHRASE = 'wrong bomb accident maze garden brass cause endless sausage twice thing engine';
const DEFAULT_PASSWORD = 'Aa123456';

export class BrowserContext {
  public static browser: Browser;
  public static page: Page;
  public static seedPhrase = DEFAULT_SEED_PHRASE;
  public static password = DEFAULT_PASSWORD;
}
