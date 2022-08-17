import { browser } from 'webextension-polyfill-ts';

import { BackgroundMessageTypes } from '../../libs/ui/src/shelter/shelter-message';

import { MessagePayloadTypes } from './shelter-message.types';

let userPassword = '';

browser.runtime.onMessage.addListener(async (payload: MessagePayloadTypes) => {
  switch (payload.type) {
    case BackgroundMessageTypes.SetUserPassword: {
      userPassword = payload.data.password;
      break;
    }
    case BackgroundMessageTypes.GetUserPassword: {
      return Promise.resolve(userPassword);
    }
    default:
      return null;
  }
});
