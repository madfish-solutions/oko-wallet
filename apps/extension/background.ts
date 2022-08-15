import { runtime } from 'webextension-polyfill';
import { browser } from 'webextension-polyfill-ts';

import { BackgroundMessageTypes } from './actions';

type MessagePayload<T> = {
  type: BackgroundMessageTypes;
  data?: T;
};

runtime.connect({ name: 'port-from-cs' });

let userPassword = '';

// @ts-ignore
browser.runtime.onMessage.addListener(<T>({ type, data }: MessagePayload<T>, _, sendResponse) => {
  switch (type) {
    case BackgroundMessageTypes.SaveUserPassword: {
      userPassword = data as unknown as string;
      break;
    }
    case BackgroundMessageTypes.GetUserPassword: {
      return sendResponse(userPassword);
    }
    default:
      return null;
  }
});
