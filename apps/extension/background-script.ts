import './shim.js';

import { BackgroundMessage, BackgroundMessageType, E2eMessageType } from 'ui/background-script';
import { Runtime, runtime, scripting, storage } from 'webextension-polyfill';

import { POPUP_CLOSED, POPUP_OPEN } from './src/constants/background';
import {
  LAST_USER_ACTIVITY_TIMESTAMP_KEY,
  LOCK_TIME_PERIOD_KEY,
  PASSWORD_HASH_KEY
} from './src/constants/storage-keys';
import { DAppMessage, InformMessage } from './src/interfaces/dapp-message.interface';
import { handleDAppMessage } from './src/utils/dApp-method.utils';
import { getSessionPasswordHash, setToStorage } from './src/utils/session.utils';
import { getState } from './src/utils/state.utils';

let isFullpageOpen = false;

scripting.registerContentScripts([
  {
    id: 'oko-inpage-script',
    matches: ['file://*/*', 'http://*/*', 'https://*/*'],
    js: ['scripts/inpage.js'],
    runAt: 'document_idle',
    // @ts-ignore
    world: 'MAIN'
  }
]);

runtime.onConnect.addListener(async port => {
  // check for time expired and max-view no opened then extension need to lock
  if (isFullpagePort(port)) {
    isFullpageOpen = true;
  }

  // listen when UI is closed
  if (port.name === 'klaytn_wallet_ui') {
    port.onDisconnect.addListener(internalPort => {
      // TODO: check if we could replace internalPort with port
      if (isFullpagePort(internalPort)) {
        isFullpageOpen = false;
      }

      return setToStorage({ [LAST_USER_ACTIVITY_TIMESTAMP_KEY]: Date.now() });
    });
  }

  const lockTimePeriod = await getState().then(result => result.settings.lockTimePeriod);
  setToStorage({ [LOCK_TIME_PERIOD_KEY]: lockTimePeriod });

  let isPopupOpened = false;
  const dAppMessagesStack: DAppMessage[] = [];

  const processRequestStack = async () => {
    while (!isPopupOpened && dAppMessagesStack.length > 0) {
      const firstMessage = dAppMessagesStack.shift();
      if (firstMessage) {
        await handleDAppMessage(firstMessage, port);
      }
    }
  };

  // listen content script messages
  port.onMessage.addListener(async (message: DAppMessage | InformMessage) => {
    runtime.onMessage.addListener(async (newMessage: InformMessage) => {
      if (newMessage.type === POPUP_CLOSED) {
        isPopupOpened = false;
        await processRequestStack();
      }

      return Promise.resolve();
    });

    if ('type' in message) {
      if (message.type === POPUP_OPEN) {
        isPopupOpened = true;
      }

      return Promise.resolve();
    }

    dAppMessagesStack.push(message);
    await processRequestStack();
  });
});

// listen messages from UI
runtime.onMessage.addListener((message: BackgroundMessage) => {
  switch (message.type) {
    case BackgroundMessageType.GetPasswordHash: {
      return getSessionPasswordHash(isFullpageOpen);
    }
    case BackgroundMessageType.SetPasswordHash: {
      return setToStorage({ [PASSWORD_HASH_KEY]: message.data.passwordHash });
    }
    case E2eMessageType.ClearStorage: {
      return storage.local.clear();
    }
    default:
      // @ts-ignore
      return Promise.reject({ message: `Message with type ${message.type} rejected.` });
  }
});

const isFullpagePort = (port: Runtime.Port) =>
  port.sender?.url?.includes(`extension://${runtime.id}/fullpage.html`) ?? false;
