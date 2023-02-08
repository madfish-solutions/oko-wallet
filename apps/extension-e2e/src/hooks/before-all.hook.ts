import { BeforeAll } from '@cucumber/cucumber';

import { BrowserContext } from '../classes/browser-context.class';
import { initBrowserContext } from '../utils/browser-context.utils';
import { initBrowser } from '../utils/browser.utils';

const LONG_TIMEOUT = 40 * 1000;

BeforeAll({ timeout: LONG_TIMEOUT }, async () => {
  const browser = await initBrowser();

  await initBrowserContext(browser);
  const SavePath = 'video-reports/demo.mp4';
  await BrowserContext.recorder.start(SavePath);
});
