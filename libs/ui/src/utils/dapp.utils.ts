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

export const sendResponseToDAppAndClosePopup = <T>(messageID: string, result: T) => {
  tabs.query({ active: true }).then(queryTabs => {
    if (queryTabs[0].id !== undefined) {
      tabs.sendMessage(queryTabs[0].id, createDAppResponse(messageID, result));
    }
  });

  setTimeout(() => close(), 1000);
};
