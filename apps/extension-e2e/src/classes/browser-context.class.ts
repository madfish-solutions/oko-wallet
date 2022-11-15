import { Browser, Page } from 'puppeteer';

export class BrowserContext {
  public static browser: Browser;
  public static page: Page;
  public static seedPhrase: string;
  public static password = 'Aa123456';
}
