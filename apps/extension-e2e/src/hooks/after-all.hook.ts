import { AfterAll } from '@cucumber/cucumber';

import { BrowserContext } from '../classes/browser-context.class';

AfterAll(async () => {
  await BrowserContext.recorder.stop();
  await BrowserContext.browser.close();
});
