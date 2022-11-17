import * as path from 'path';
import { Browser, launch } from 'puppeteer';

const EXTENSION_PATH = path.resolve(__dirname, '../../../extension/dist');

export const initBrowser = () =>
  launch({
    headless: false,
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: [`--disable-extensions-except=${EXTENSION_PATH}`, `--load-extension=${EXTENSION_PATH}`, '--no-sandbox']
  });

export const getExtensionId = async (browser: Browser) => {
  const [page] = await browser.pages();
  // Needed to catch service worker
  await page.goto('https://www.google.com/');

  const extensionTarget = browser.targets().find(target => target.type() === 'service_worker');

  if (extensionTarget === undefined) {
    throw Error('Extension not found');
  } else {
    const backgroundScriptUrl = extensionTarget.url();
    const [, , extensionId] = backgroundScriptUrl.split('/');

    return extensionId;
  }
};
