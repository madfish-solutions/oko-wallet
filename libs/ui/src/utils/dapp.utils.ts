import { tabs } from 'webextension-polyfill';

const INPAGE = 'oko-inpage';
const PROVIDER = 'oko-provider';

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

export const sendResponseToDAppAndClosePopup = <T>(messageID: string, result: T) => {
  tabs.query({ active: true }).then(queryTabs => {
    if (queryTabs[0].id !== undefined) {
      tabs.sendMessage(queryTabs[0].id, createDAppResponse(messageID, result));
    }
  });

  setTimeout(() => close(), 1000);
};

export const sendErrorToDAppAndClosePopup = (id: string) => {
  tabs.query({ active: true }).then(queryTabs => {
    if (queryTabs[0].id !== undefined) {
      tabs.sendMessage(queryTabs[0].id, createErrorMessage(id));
    }
  });

  setTimeout(() => close(), 1000);
};

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

export const sendNotificationToDApp = <T>(method: string, result: T) => {
  tabs.query({ active: true }).then(queryTabs => {
    if (queryTabs[0].id !== undefined) {
      tabs.sendMessage(queryTabs[0].id, createDAppNotificationResponse(method, result));
    }
  });
};
