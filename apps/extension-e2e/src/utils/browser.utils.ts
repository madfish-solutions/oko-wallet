import * as path from 'path';
import { Browser, launch } from 'puppeteer';

import { sleep } from './promise.utils';

const EXTENSION_PATH = path.resolve(__dirname, '../../../extension/dist');

export const initBrowser = () =>
  launch({
    headless: false,
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    args: [`--disable-extensions-except=${EXTENSION_PATH}`, `--load-extension=${EXTENSION_PATH}`, '--no-sandbox']
  });

export const getExtensionId = async (browser: Browser) => {
  await sleep(1250);

  const extensionTarget = browser
    .targets()
    .find(
      targetParam =>
        targetParam.url().startsWith('chrome-extension://') &&
        ['service_worker', 'background_page'].includes(targetParam.type())
    );

  if (extensionTarget == null) {
    throw new Error('Extension not found');
  }

  const backgroundScriptUrl = extensionTarget.url();
  const [, , extensionId] = backgroundScriptUrl.split('/');

  return extensionId;
};
