import { browser } from 'webextension-polyfill-ts';

import { BackgroundMessageTypes } from '../../libs/ui/src/shelter/shelter-message';

import { MessageType } from './shelter-message.types';

let userPassword: string | undefined;
let lastUserActivityTimestamp = 0;
const LOCK_PERIOD = 5000;

browser.runtime.onMessage.addListener(async (message: MessageType) => {
  switch (message.type) {
    case BackgroundMessageTypes.SetUserPassword: {
      userPassword = message.data.password;

      return Promise.resolve();
    }
    case BackgroundMessageTypes.GetUserPassword: {
      if (Date.now() > lastUserActivityTimestamp + LOCK_PERIOD) {
        userPassword = undefined;
      }

      return Promise.resolve(userPassword);
    }
    default:
      // @ts-ignore
      return Promise.reject({ message: `Message with type ${message.type} rejected.` });
  }
});

browser.runtime.onConnect.addListener(function (port) {
  if (port.name === 'popup') {
    port.onDisconnect.addListener(function () {
      lastUserActivityTimestamp = Date.now();
    });
  }
});
