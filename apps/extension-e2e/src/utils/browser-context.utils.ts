import retry from 'async-retry';
import { Browser } from 'puppeteer';

import { BrowserContext } from '../classes/browser-context.class';
import { RETRY_OPTIONS } from '../constant/defaults';

import { getExtensionId } from './browser.utils';

export const initBrowserContext = async (browser: Browser) => {
  const extensionId = await getExtensionId(browser);
  const extensionUrl = `chrome-extension://${extensionId}/fullpage.html`;

  const extensionPage = await retry(async () => {
    const pages = await browser.pages();

    const page = pages.find(p => p.url().startsWith(extensionUrl));

    if (page == null) {
      throw new Error('Initial extension page not found');
    }

    await pages[0].close();

    return page;
  }, RETRY_OPTIONS);

  BrowserContext.browser = browser;
  BrowserContext.page = extensionPage;
};
