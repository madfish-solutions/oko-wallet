import './shim.js';
import { browser, Runtime } from 'webextension-polyfill-ts';

import { BackgroundMessageType } from '../../libs/ui/src/messagers/enums/background-message-types.enum';
import { BackgroundMessage } from '../../libs/ui/src/messagers/types/background-message.types';

const INITIAL_PASSWORD_HASH = '';
const LOCK_PERIOD = 5 * 60 * 1000;
const URL_BASE = 'extension://';

let passwordHash = INITIAL_PASSWORD_HASH;
let lastUserActivityTimestamp = 0;
let isLockApp = true;

browser.runtime.onConnect.addListener(port => {
  // check for time expired and max-view no opened then extension need to lock
  const savedSessionTimeExpired = Date.now() > lastUserActivityTimestamp + LOCK_PERIOD;
  const isExtensionOpen = getChromePredicate(port);

  if (savedSessionTimeExpired && !isExtensionOpen) {
    isLockApp = true;

    console.log({
      action: 'Lock app',
      lastUserActivityTimestamp: new Date(lastUserActivityTimestamp),
      dateNow: new Date(Date.now()),
      timeGap: `need more than 300_000 - ${Date.now() - lastUserActivityTimestamp}`,
      isExtensionOpen,
      savedSessionTimeExpired
    });
  } else {
    isLockApp = false;
    console.log({
      action: 'Unlock app',
      lastUserActivityTimestamp: new Date(lastUserActivityTimestamp),
      timeGap: `need less than 300_000 - ${Date.now() - lastUserActivityTimestamp}`,
      dateNow: new Date(Date.now()),
      isExtensionOpen,
      savedSessionTimeExpired
    });
  }

  // listen when UI is closed
  if (port.name === 'klaytn_wallet_ui') {
    port.onDisconnect.addListener(() => (lastUserActivityTimestamp = Date.now()));
  }
});

// listen messages from UI
browser.runtime.onMessage.addListener((message: BackgroundMessage) => {
  switch (message.type) {
    case BackgroundMessageType.SetPasswordHash: {
      passwordHash = message.data.passwordHash;

      return Promise.resolve();
    }
    case BackgroundMessageType.GetPasswordHash: {
      if (isLockApp) {
        passwordHash = INITIAL_PASSWORD_HASH;
      }

      return Promise.resolve(passwordHash);
    }
    default:
      // @ts-ignore
      return Promise.reject({ message: `Message with type ${message.type} rejected.` });
  }
});

const getChromePredicate = (port: Runtime.Port) =>
  port.sender?.url?.includes(`${URL_BASE}${browser.runtime.id}`) ?? false;
