import './shim.js';
import { Windows } from 'webextension-polyfill';
import { browser, Runtime } from 'webextension-polyfill-ts';

import { BackgroundMessageType } from '../../libs/ui/src/messagers/enums/background-message-types.enum';
import { BackgroundMessage } from '../../libs/ui/src/messagers/types/background-message.types';
import { updateDappInfo } from '../../libs/ui/src/store/background-script/dapps.actions';
import { createStore2 } from '../../libs/ui/src/store/store';

console.log('back is working...');

const { store } = createStore2();

const INITIAL_PASSWORD_HASH = '';
// Locks when background-script dies!
const LOCK_PERIOD = 5 * 60 * 1000;
const URL_BASE = 'extension://';

let passwordHash = INITIAL_PASSWORD_HASH;
let lastUserActivityTimestamp = 0;
let isLockApp = true;

let isFullpageOpen = false;

let openExtensionId = 0;

browser.scripting.registerContentScripts([
  {
    id: 'inpage',
    matches: ['file://*/*', 'http://*/*', 'https://*/*'],
    js: ['scripts/inpage.js'],
    runAt: 'document_start',
    world: 'MAIN'
  }
]);

const getExtensionPopup = (windows: Windows.Window[], id: number) =>
  windows.find(win => win.type === 'popup' && win.id === id);

const openConnectPopup = async (origin: string, id: string, chainId?: string) => {
  const allWindows = await browser.windows.getAll().then(windows => windows);
  const activePopup = getExtensionPopup(allWindows, openExtensionId);
  if (activePopup && activePopup.id !== undefined) {
    browser.windows.update(activePopup.id, { focused: true });
  } else {
    const newWindow = await browser.windows.create({
      type: 'popup',
      url: browser.runtime.getURL(`popup.html?&origin=${origin}&id=${id}&chainId=${chainId}`),
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

const connectToDappInBackground = (dappInfo: any, origin: string, id: number, port: Runtime.Port) => {
  if (Object.keys(dappInfo).length > 0) {
    const message = {
      result: [dappInfo.address],
      target: 'requestAccounts',
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

  // listen content script messages
  port.onMessage.addListener(async msg => {
    if (msg.data?.target === 'metamask-contentscript') {
      const id = msg.data?.data?.data?.id;
      const origin = msg.origin;
      const dappInfo = store.getState().dapps?.[origin];
      const chainId = msg.data?.data?.data?.params?.[0]?.chainId;

      switch (msg.data?.data?.data?.method) {
        case 'eth_requestAccounts': {
          if (dappInfo !== undefined) {
            await connectToDappInBackground(dappInfo, origin, id, port);
          }

          await openConnectPopup(origin, id);

          return Promise.resolve();
        }

        case 'wallet_switchEthereumChain': {
          await openConnectPopup(origin, id, chainId);

          return Promise.resolve();
        }
        case 'metamask_getProviderState': {
          if (dappInfo !== undefined) {
            await connectToDappInBackground(dappInfo, origin, id, port);
          }

          return Promise.resolve();
        }
        case 'metamask_sendDomainMetadata': {
          console.log('send domain data is working');
          const currentDappLogo = msg.data?.data?.data?.params.icon;
          console.log(msg.data, 'METADATA');

          const newDapp = {
            logoUrl: currentDappLogo,
            name: origin
          };

          store.dispatch(updateDappInfo(newDapp));

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
