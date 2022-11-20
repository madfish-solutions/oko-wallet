import './shim.js';

import { BackgroundMessageType, BackgroundMessage, createDAppResponse } from 'ui/background-script';
import { Runtime, scripting, runtime } from 'webextension-polyfill';

import { DAppMessage } from './src/interfaces/dapp-message.interface';
import { openDAppConnectionConfirmationPopup, openNetworkChangeConfirmationPopup } from './src/utils/browser.utils';
import { getHexChanId } from './src/utils/network.utils';
import { getState } from './src/utils/state.utils';

const INITIAL_PASSWORD_HASH = '';
// Locks when background-script dies!
const LOCK_PERIOD = 5 * 60 * 1000;
const URL_BASE = 'extension://';

let passwordHash = INITIAL_PASSWORD_HASH;
let lastUserActivityTimestamp = 0;
// TODO: contact Sviat wtf is this
let isLockApp = true;

let isFullpageOpen = false;

scripting.registerContentScripts([
  {
    id: 'inpage-script',
    matches: ['file://*/*', 'http://*/*', 'https://*/*'],
    js: ['scripts/inpage.js'],
    runAt: 'document_start',
    // @ts-ignore
    world: 'MAIN'
  }
]);

runtime.onConnect.addListener(port => {
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
  port.onMessage.addListener(async (message: DAppMessage) => {
    const data = message.data.data.data;

    if (message.data.target === 'oko-contentscript' && data !== undefined) {
      const id = data.id;
      const method = data.method;
      const dAppInfo = message.sender;

      const state = await getState();

      const dAppState = state.dApps[dAppInfo.origin];
      const selectedNetworkChainId = state.wallet.selectedNetworkChainId;
      const selectedAccountPublicKeyHash = state.wallet.selectedAccountPublicKeyHash;
      const isPermissionGranted = dAppState?.allowedAccounts.includes(selectedAccountPublicKeyHash);

      switch (method) {
        case 'eth_requestAccounts': {
          if (isPermissionGranted) {
            const result = [selectedAccountPublicKeyHash];
            const message = createDAppResponse(id, result);

            port.postMessage(message);
          } else {
            await openDAppConnectionConfirmationPopup(id, dAppInfo);
          }

          return Promise.resolve();
        }
        case 'eth_accounts': {
          if (isPermissionGranted) {
            const result = [selectedAccountPublicKeyHash];
            const message = createDAppResponse(id, result);

            port.postMessage(message);
          }

          return Promise.resolve();
        }
        case 'wallet_addEthereumChain':
        case 'wallet_switchEthereumChain': {
          await openNetworkChangeConfirmationPopup(id, dAppInfo.origin, data.params?.[0]?.chainId);

          return Promise.resolve();
        }
        // TODO : improve response
        case 'oko_getProviderState': {
          if (isPermissionGranted) {
            const result = {
              accounts: [selectedAccountPublicKeyHash],
              chainId: getHexChanId(selectedNetworkChainId),
              isUnlocked: true,
              networkVersion: '56'
            };
            const message = createDAppResponse(id, result);

            port.postMessage(message);
          }

          return Promise.resolve();
        }
        case 'eth_chainId': {
          const result = getHexChanId(selectedNetworkChainId);
          const message = createDAppResponse(id, result);

          port.postMessage(message);

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
runtime.onMessage.addListener((message: BackgroundMessage) => {
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
  port.sender?.url?.includes(`${URL_BASE}${runtime.id}/fullpage.html`) ?? false;
