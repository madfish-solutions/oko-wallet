import { Before } from '@cucumber/cucumber';

import { E2eMessageType } from '../../../../libs/ui/src/messagers/enums/e2e-message-type.enum';
import { BackgroundMessage } from '../../../../libs/ui/src/messagers/types/background-message.type';
import { BrowserContext } from '../classes/browser-context.class';
import { DEFAULT_PASSWORD, DEFAULT_HD_ACCOUNT_SEED_PHRASE } from '../utils/env.utils';

const clearStorageMessage: BackgroundMessage = { type: E2eMessageType.ClearStorage };

Before(() =>
  BrowserContext.page
    // @ts-ignore
    .evaluate(message => chrome.runtime.sendMessage(undefined, message), clearStorageMessage)
    .then(() => {
      BrowserContext.seedPhrase = DEFAULT_HD_ACCOUNT_SEED_PHRASE;
      BrowserContext.password = DEFAULT_PASSWORD;

      return BrowserContext.page.reload();
    })
    .then(() => console.log('page was reloaded'))
    .catch(error => console.log(error))
);
