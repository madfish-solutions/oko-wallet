import { isDefined } from '@rnw-community/shared';
import { tabs, runtime } from 'webextension-polyfill';

import { INPAGE, PROVIDER } from '../inpage';

export const POPUP_CLOSED = 'POPUP_CLOSED';
export const POPUP_OPEN = 'POPUP_OPEN';

export const createDAppResponse = <T>(id: string, result: T) => ({
  data: {
    data: {
      id: Number(id),
      jsonrpc: '2.0',
      result
    },
    name: PROVIDER
  },
  target: INPAGE
});

const createErrorMessage = (id: string) => ({
  data: {
    data: {
      id: Number(id),
      jsonrpc: '2.0',
      error: {
        message: 'User denied transaction signature',
        code: 4001
      }
    },
    name: PROVIDER
  },
  target: INPAGE
});

const createDAppNotificationResponse = <T>(method: string, params: T) => ({
  data: {
    data: {
      method,
      params
    },
    name: PROVIDER
  },
  target: INPAGE
});

const sendMessageToDAppTab = (origin: string, response: unknown) => {
  tabs.query({}).then(queryTabs => {
    const dAppTab = queryTabs.find(tab => tab.url?.includes(origin));
    if (isDefined(dAppTab) && isDefined(dAppTab.id)) {
      tabs.sendMessage(dAppTab.id, response);
    }
  });
};

export const sendResponseToDAppAndClosePopup = <T>(origin: string, id: string, result: T) => {
  const response = createDAppResponse(id, result);
  sendMessageToDAppTab(origin, response);

  setTimeout(() => close(), 1000);
};

export const sendErrorToDAppAndClosePopup = (origin: string, id: string) => {
  const errorResponse = createErrorMessage(id);
  sendMessageToDAppTab(origin, errorResponse);
  sendMessageToBackground();

  setTimeout(() => close(), 1000);
};

export const sendNotificationToDApp = <T>(origin: string, method: string, result: T) => {
  const notification = createDAppNotificationResponse(method, result);
  sendMessageToDAppTab(origin, notification);
};

export const sendMessageToBackground = () => {
  runtime.sendMessage(undefined, { type: POPUP_CLOSED });
};
