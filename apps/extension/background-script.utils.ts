import { browser, Runtime, Windows } from 'webextension-polyfill-ts';

import { DAppState } from '../../libs/ui/src/store/dapps/dapps.state';

export let openExtensionId = 0;

export const prepareResponse = (result: unknown, id: number) => ({
  data: {
    data: { id: Number(id), jsonrpc: '2.0', result },
    name: 'oko-provider'
  },
  target: 'oko-inpage'
});

export const getExtensionPopup = (windows: Windows.Window[], id: number) =>
  windows.find(win => win.type === 'popup' && win.id === id);

export const openConnectPopup = async (origin: string, id: string) => {
  const allWindows = await browser.windows.getAll().then(windows => windows);
  const activePopup = getExtensionPopup(allWindows, openExtensionId);
  if (activePopup && activePopup.id !== undefined) {
    browser.windows.update(activePopup.id, { focused: true });
  } else {
    const newWindow = await browser.windows.create({
      type: 'popup',
      url: browser.runtime.getURL(`popup.html?&origin=${origin}&id=${id}`),
      width: 360,
      height: 600,
      top: 20,
      left: 20
    });

    if (newWindow.id !== undefined) {
      openExtensionId = newWindow.id;
    }
  }
};

export const openSwitchChainPopup = async (origin: string, id: string, chainId: string) => {
  await browser.windows.create({
    type: 'popup',
    url: browser.runtime.getURL(`popup.html?&origin=${origin}&id=${id}&chainId=${chainId}`),
    width: 360,
    height: 600,
    top: 20,
    left: 20
  });
};

export const connectToDappInBackground = (
  dappInfo: Omit<DAppState, 'name'>,
  id: number,
  port: Runtime.Port,
  target: string
) => {
  if (Object.keys(dappInfo).length > 0) {
    const message = {
      result: dappInfo,
      target,
      id
    };
    port.postMessage(message);
  }

  return Promise.resolve();
};
