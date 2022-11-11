import { BeforeAll } from '@cucumber/cucumber';

import { BrowserContext } from '../classes/browser-context.class';
import { initBrowserContext } from '../utils/browser-context.utils';
import { getExtensionId, initBrowser } from '../utils/browser.utils';

BeforeAll(async () => {
  const browser = await initBrowser();
  const extensionId = await getExtensionId(browser);

  await initBrowserContext(browser);

  await BrowserContext.page.goto(`chrome-extension://${extensionId}/fullpage.html`);
});
