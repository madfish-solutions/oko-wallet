import { Browser } from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

import { BrowserContext } from '../classes/browser-context.class';

import { getExtensionId } from './browser.utils';

export const initBrowserContext = async (browser: Browser) => {
  const extensionId = await getExtensionId(browser);
  const extensionUrl = `chrome-extension://${extensionId}/fullpage.html`;

  const pages = await browser.pages();

  const page = pages.find(p => p.url().startsWith(extensionUrl));

  if (page == null) {
    throw new Error('Initial extension page not found');
  }

  await pages[0].close();

  BrowserContext.browser = browser;
  BrowserContext.page = page;
  BrowserContext.recorder = new PuppeteerScreenRecorder(BrowserContext.page);
};
