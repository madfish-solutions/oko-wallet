import { browser } from 'webextension-polyfill-ts';

import { DAppInfo } from '../../libs/ui/src/store/dapps/dapps.state';

export const getHexChanId = (chainId: string) => `0x${Number(chainId).toString(16)}`;



export const openConnectPopup = async (id: string, dAppInfo: DAppInfo) =>
  browser.windows.create({
    type: 'popup',
    url: browser.runtime.getURL(`popup.html?id=${id}&dAppInfo=${JSON.stringify(dAppInfo)}`),
    width: 360,
    height: 600,
    top: 20,
    left: 20
  });

export const openSwitchChainPopup = async (id: string, origin: string, requestedChainId: string) =>
  browser.windows.create({
    type: 'popup',
    url: browser.runtime.getURL(`popup.html?&origin=${origin}&id=${id}&requestedChainId=${requestedChainId}`),
    width: 360,
    height: 600,
    top: 20,
    left: 20
  });
