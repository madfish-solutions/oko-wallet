import { Before } from '@cucumber/cucumber';

import { E2eMessageType } from '../../../../libs/ui/src/messagers/enums/e2e-message-type.enum';
import { BackgroundMessage } from '../../../../libs/ui/src/messagers/types/background-message.type';
import { BrowserContext, DEFAULT_PASSWORD, DEFAULT_SEED_PHRASE } from '../classes/browser-context.class';

const clearStorageMessage: BackgroundMessage = { type: E2eMessageType.ClearStorage };

Before(async () => {
  // @ts-ignore
  await BrowserContext.page.evaluate(message => chrome.runtime.sendMessage(undefined, message), clearStorageMessage);
  BrowserContext.seedPhrase = DEFAULT_SEED_PHRASE;
  BrowserContext.password = DEFAULT_PASSWORD;
  await BrowserContext.page.reload();
});
