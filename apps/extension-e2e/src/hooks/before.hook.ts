import { Before } from '@cucumber/cucumber';

import { E2eMessageType } from '../../../../libs/shelter/src/messagers/enums/e2e-message-type.enum';
import { BackgroundMessage } from '../../../../libs/shelter/src/messagers/types/background-message.type';
import { BrowserContext, DEFAULT_PASSWORD, DEFAULT_SEED_PHRASE } from '../classes/browser-context.class';

const clearStorageMessage: BackgroundMessage = { type: E2eMessageType.ClearStorage };

Before(async () => {
  await BrowserContext.page
    // @ts-ignore
    .evaluate(message => chrome.runtime.sendMessage(undefined, message), clearStorageMessage)
    .catch(error => console.log(error));
  BrowserContext.seedPhrase = DEFAULT_SEED_PHRASE;
  BrowserContext.password = DEFAULT_PASSWORD;
  await BrowserContext.page.reload();
});
