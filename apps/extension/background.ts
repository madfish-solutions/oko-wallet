import './shim.js';
import { browser } from 'webextension-polyfill-ts';

import { BackgroundMessageType } from '../../libs/ui/src/messagers/enums/background-message-types.enum';
import { BackgroundMessage } from '../../libs/ui/src/messagers/types/background-message.types';

const INITIAL_PASSWORD_HASH = '';
const LOCK_PERIOD = 5 * 60 * 1000;

let passwordHash = INITIAL_PASSWORD_HASH;
let lastUserActivityTimestamp = 0;

browser.runtime.onConnect.addListener(port => {
  if (port.name === 'klaytn_wallet_ui') {
    port.onDisconnect.addListener(() => (lastUserActivityTimestamp = Date.now()));
  }
});

browser.runtime.onMessage.addListener((message: BackgroundMessage) => {
  switch (message.type) {
    case BackgroundMessageType.SetPasswordHash: {
      passwordHash = message.data.passwordHash;

      return Promise.resolve();
    }
    case BackgroundMessageType.GetPasswordHash: {
      if (Date.now() > lastUserActivityTimestamp + LOCK_PERIOD) {
        passwordHash = INITIAL_PASSWORD_HASH;
      }

      return Promise.resolve(passwordHash);
    }
    default:
      // @ts-ignore
      return Promise.reject({ message: `Message with type ${message.type} rejected.` });
  }
});
