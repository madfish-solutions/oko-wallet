import './shim.js';
import { Windows } from 'webextension-polyfill';
import { browser, Runtime } from 'webextension-polyfill-ts';

import { BackgroundMessageType } from '../../libs/ui/src/messagers/enums/background-message-types.enum';
import { BackgroundMessage } from '../../libs/ui/src/messagers/types/background-message.types';
import { BackgroundRootState, createBackgroundStore } from '../../libs/ui/src/store/background-store';
import { DappPayloadState } from '../../libs/ui/src/store/dapps/dapps.state';

console.log('background is working...');
const INITIAL_PASSWORD_HASH = '';
// Locks when background-script dies!
const LOCK_PERIOD = 5 * 60 * 1000;
const URL_BASE = 'extension://';

let passwordHash = INITIAL_PASSWORD_HASH;
let lastUserActivityTimestamp = 0;
let isLockApp = true;

let isFullpageOpen = false;

let openExtensionId = 0;

let currentLogo = '';

browser.scripting.registerContentScripts([
  {
    id: 'inpage-script',
    matches: ['file://*/*', 'http://*/*', 'https://*/*'],
    js: ['scripts/inpage.js'],
    runAt: 'document_start',
    world: 'MAIN'
  }
]);

const getExtensionPopup = (windows: Windows.Window[], id: number) =>
  windows.find(win => win.type === 'popup' && win.id === id);

const openConnectPopup = async (origin: string, id: string, logo: string) => {
  const allWindows = await browser.windows.getAll().then(windows => windows);
  const activePopup = getExtensionPopup(allWindows, openExtensionId);
  if (activePopup && activePopup.id !== undefined) {
    browser.windows.update(activePopup.id, { focused: true });
  } else {
    const newWindow = await browser.windows.create({
      type: 'popup',
      url: browser.runtime.getURL(`popup.html?&origin=${origin}&id=${id}&logo=${logo}`),
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

const openSwitchChainPopup = async (origin: string, id: string, chainId: string) => {
  await browser.windows.create({
    type: 'popup',
    url: browser.runtime.getURL(`popup.html?&origin=${origin}&id=${id}&chainId=${chainId}`),
    width: 360,
    height: 600,
    top: 20,
    left: 20
  });
};

const connectToDappInBackground = (
  dappInfo: Omit<DappPayloadState, 'name'>,
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

browser.runtime.onConnect.addListener(port => {
  // check for time expired and max-view no opened then extension need to lock
  const savedSessionTimeExpired = Date.now() > lastUserActivityTimestamp + LOCK_PERIOD;

  if (isFullpagePort(port)) {
    isFullpageOpen = true;
  }

  if (savedSessionTimeExpired && !isFullpageOpen) {
    isLockApp = true;
  } else {
    isLockApp = false;
  }

  // listen when UI is closed
  if (port.name === 'klaytn_wallet_ui') {
    port.onDisconnect.addListener(port => {
      if (isFullpagePort(port)) {
        isFullpageOpen = false;
      }

      return (lastUserActivityTimestamp = Date.now());
    });
  }
  let storeInBG: Partial<BackgroundRootState> = {};

  // listen content script messages
  port.onMessage.addListener(async msg => {
    if (msg.data?.target === 'metamask-contentscript') {
      const data = msg.data?.data?.data;
      const id = data?.id;
      const origin = msg.origin;
      const method = data?.method;

      const { store } = createBackgroundStore();
      store.subscribe(() => {
        storeInBG = { ...store.getState() };
      });

      const dappInfo = storeInBG?.dapps?.[origin];

      const selectedChainId = storeInBG?.wallet?.selectedNetworkChainId;

      switch (method) {
        case 'eth_requestAccounts': {
          if (dappInfo !== undefined && dappInfo.address !== undefined) {
            connectToDappInBackground(dappInfo, id, port, 'request');
          } else {
            await openConnectPopup(origin, id, currentLogo);
          }

          return Promise.resolve();
        }
        case 'eth_accounts': {
          if (dappInfo !== undefined && dappInfo.address !== undefined) {
            connectToDappInBackground(dappInfo, id, port, 'request');
          }

          return Promise.resolve();
        }
        case 'wallet_addEthereumChain':
        case 'wallet_switchEthereumChain': {
          await openSwitchChainPopup(origin, id, data.params[0].chainId);

          return Promise.resolve();
        }
        case 'metamask_getProviderState': {
          if (dappInfo !== undefined && dappInfo.address !== undefined) {
            await connectToDappInBackground(dappInfo, id, port, 'providerState');
          }

          return Promise.resolve();
        }
        case 'metamask_sendDomainMetadata': {
          currentLogo = data?.params.icon;

          return Promise.resolve();
        }

        case 'eth_chainId': {
          connectToDappInBackground({ chainId: `0x${Number(selectedChainId).toString(16)}` }, id, port, 'chainId');

          return Promise.resolve();
        }

        default: {
          return Promise.resolve();
        }
      }
    }
  });
});

// listen messages from UI
browser.runtime.onMessage.addListener((message: BackgroundMessage) => {
  switch (message.type) {
    case BackgroundMessageType.SetPasswordHash: {
      passwordHash = message.data.passwordHash;

      return Promise.resolve();
    }
    case BackgroundMessageType.GetPasswordHash: {
      if (isLockApp) {
        passwordHash = INITIAL_PASSWORD_HASH;
      }

      return Promise.resolve(passwordHash);
    }
    default:
      // @ts-ignore
      return Promise.reject({ message: `Message with type ${message.type} rejected.` });
  }
});

const isFullpagePort = (port: Runtime.Port) =>
  port.sender?.url?.includes(`${URL_BASE}${browser.runtime.id}/fullpage.html`) ?? false;
