import { isDefined } from '@rnw-community/shared';
import { tabs } from 'webextension-polyfill';

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

export const sendResponseToDAppAndClosePopup = <T>(messageID: string, result: T, origin?: string) => {
  tabs.query({}).then(queryTabs => {
    if (isDefined(origin)) {
      const dAppTab = queryTabs.find(tab => tab.url?.includes(origin));
      if (isDefined(dAppTab) && isDefined(dAppTab.id)) {
        tabs.sendMessage(dAppTab.id, createDAppResponse(messageID, result));
      }
    } else {
      if (queryTabs[0].id !== undefined) {
        tabs.sendMessage(queryTabs[0].id, createDAppResponse(messageID, result));
      }
    }
  });

  setTimeout(() => close(), 1000);
};

export const sendErrorToDAppAndClosePopup = (id: string, origin?: string) => {
  tabs.query({}).then(queryTabs => {
    if (isDefined(origin)) {
      const dAppTab = queryTabs.find(tab => tab.url?.includes(origin));
      if (isDefined(dAppTab) && isDefined(dAppTab.id)) {
        tabs.sendMessage(dAppTab.id, createErrorMessage(id));
      }
    }
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
    name: 'oko-provider'
  },
  target: 'oko-inpage'
});

export const sendNotificationToDApp = <T>(method: string, result: T, origin?: string) => {
  tabs.query({}).then(queryTabs => {
    if (isDefined(origin)) {
      const dAppTab = queryTabs.find(tab => tab.url?.includes(origin));
      console.log(dAppTab, 'dapp');
      if (isDefined(dAppTab) && isDefined(dAppTab.id)) {
        tabs.sendMessage(dAppTab.id, createDAppNotificationResponse(method, result));
      }
    } else if (queryTabs[0].id !== undefined) {
      tabs.sendMessage(queryTabs[0].id, createDAppNotificationResponse(method, result));
    }
  });
};
