import { isDefined } from '@rnw-community/shared';
import { tabs, runtime } from 'webextension-polyfill';

export const createDAppResponse = <T>(id: string, result: T) => ({
  data: {
    data: {
      id: Number(id),
      jsonrpc: '2.0',
      result
    },
    name: 'oko-provider'
  },
  target: 'oko-inpage'
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
    name: 'oko-provider'
  },
  target: 'oko-inpage'
});

const createDAppNotificationResponse = <T>(method: string, params: T) => ({
  data: {
    data: {
      method,
      params
    },
    name: 'oko-provider'
  },
  target: 'oko-inpage'
});

const sendMessageToDAppTab = (response: unknown, origin: string) => {
  tabs.query({}).then(queryTabs => {
    const dAppTab = queryTabs.find(tab => tab.url?.includes(origin));
    if (isDefined(dAppTab) && isDefined(dAppTab.id)) {
      tabs.sendMessage(dAppTab.id, response);
    }
  });
};

export const sendResponseToDAppAndClosePopup = <T>(id: string, result: T, origin: string) => {
  const response = createDAppResponse(id, result);
  sendMessageToDAppTab(response, origin);

  setTimeout(() => close(), 1000);
};

export const sendErrorToDAppAndClosePopup = (id: string, origin: string) => {
  const errorResponse = createErrorMessage(id);
  sendMessageToDAppTab(errorResponse, origin);

  setTimeout(() => close(), 1000);
};

export const sendNotificationToDApp = <T>(method: string, result: T, origin: string) => {
  const notification = createDAppNotificationResponse(method, result);
  sendMessageToDAppTab(notification, origin);
};

export const sendMessageToBackground = () => {
  runtime.sendMessage(undefined, { type: 'POPUP_CLOSED' });
};
