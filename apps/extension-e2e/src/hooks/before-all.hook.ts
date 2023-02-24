import { BeforeAll } from '@cucumber/cucumber';

import { BrowserContext } from '../classes/browser-context.class';
import { initBrowserContext } from '../utils/browser-context.utils';
import { initBrowser } from '../utils/browser.utils';

const LONG_TIMEOUT = 10000;
const VIDEO_RECORDER_SAVE_PATH = 'video-reports/test-run.mp4';

BeforeAll({ timeout: LONG_TIMEOUT }, async () => {
  const browser = await initBrowser();

  await initBrowserContext(browser);
  await BrowserContext.recorder.start(VIDEO_RECORDER_SAVE_PATH);
});
