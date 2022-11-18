import { browser } from 'webextension-polyfill-ts';

import { DAppInfo } from '../../libs/ui/src/store/dapps/dapps.state';

let openedExtensionId = 0;

export const getHexChanId = (chainId: string) => `0x${Number(chainId).toString(16)}`;

export const createDAppResponse = (id: string, result: any) => ({
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

const getExtensionPopup = async (extensionId: number) => {
  const allWindows = await browser.windows.getAll().then(windows => windows);

  return allWindows.find(win => win.type === 'popup' && win.id === extensionId);
};

export const openConnectPopup = async (id: string, dAppInfo: DAppInfo) => {
  const extensionPopup = await getExtensionPopup(openedExtensionId);

  if (extensionPopup && extensionPopup.id !== undefined) {
    browser.windows.update(extensionPopup.id, { focused: true });
  } else {
    const newWindow = await browser.windows.create({
      type: 'popup',
      url: browser.runtime.getURL(`popup.html?id=${id}&dAppInfo=${JSON.stringify(dAppInfo)}`),
      width: 360,
      height: 600,
      top: 20,
      left: 20
    });

    if (newWindow.id !== undefined) {
      openedExtensionId = newWindow.id;
    }
  }
};

export const openSwitchChainPopup = async (origin: string, id: string, chainId: string) =>
  browser.windows.create({
    type: 'popup',
    url: browser.runtime.getURL(`popup.html?&origin=${origin}&id=${id}&chainId=${chainId}`),
    width: 360,
    height: 600,
    top: 20,
    left: 20
  });
