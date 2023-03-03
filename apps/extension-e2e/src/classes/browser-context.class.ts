import { Browser, Page } from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

import { DEFAULT_PASSWORD, DEFAULT_HD_ACCOUNT_SEED_PHRASE } from '../utils/env.utils';

export class BrowserContext {
  public static browser: Browser;
  public static page: Page;
  public static recorder: PuppeteerScreenRecorder;
  public static seedPhrase = DEFAULT_HD_ACCOUNT_SEED_PHRASE;
  public static password = DEFAULT_PASSWORD;
}
