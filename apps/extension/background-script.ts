import './shim.js';

import { BackgroundMessage, BackgroundMessageType, E2eMessageType } from 'shelter/background-script';
import { POPUP_OPEN, POPUP_CLOSED } from 'ui/background-script';
import { Runtime, runtime, scripting, storage } from 'webextension-polyfill';

import { CONTENT_SCRIPT_PORT_NAME } from './src/constants/content-script';
import {
  LAST_USER_ACTIVITY_TIMESTAMP_KEY,
  LOCK_TIME_PERIOD_KEY,
  PASSWORD_HASH_KEY
} from './src/constants/storage-keys';
import { DAppMessage, InformMessage } from './src/interfaces/dapp-message.interface';
import { handleDAppMessage } from './src/utils/dApp-method.utils';
import { openFullPage } from './src/utils/fullpage.utils';
import { getSessionPasswordHash, setToStorage } from './src/utils/session.utils';
import { getState } from './src/utils/state.utils';

let isFullpageOpen = false;

scripting.registerContentScripts([
  {
    id: 'oko-inpage-script',
    matches: ['file://*/*', 'http://*/*', 'https://*/*'],
    js: ['scripts/inpage.js'],
    runAt: 'document_start',
    // @ts-ignore
    world: 'MAIN'
  }
]);

runtime.onInstalled.addListener(({ reason }) => (reason === 'install' ? openFullPage() : null));

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

  if (port.name === CONTENT_SCRIPT_PORT_NAME) {
    port.onDisconnect.addListener(disconnectedPort => disconnectedPort.disconnect());
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

  runtime.onMessage.addListener(async (newMessage: BackgroundMessage | InformMessage) => {
    switch (newMessage.type) {
      case BackgroundMessageType.GetPasswordHash: {
        return getSessionPasswordHash(isFullpageOpen);
      }
      case BackgroundMessageType.SetPasswordHash: {
        if ('data' in newMessage) {
          return setToStorage({ [PASSWORD_HASH_KEY]: newMessage.data.passwordHash });
        }

        return;
      }
      case E2eMessageType.ClearStorage: {
        return storage.local.clear();
      }
      case POPUP_CLOSED: {
        isPopupOpened = false;
        await processRequestStack();

        return Promise.resolve();
      }
      default:
        return Promise.reject({ message: `Message with type ${newMessage.type} rejected.` });
    }
  });

  // listen content script messages
  port.onMessage.addListener(async (message: DAppMessage | InformMessage) => {
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

const isFullpagePort = (port: Runtime.Port) =>
  port.sender?.url?.includes(`extension://${runtime.id}/fullpage.html`) ?? false;
