import './shim.js';

import { getDefaultProvider } from 'ethers';
import {
  BackgroundMessage,
  BackgroundMessageType,
  createDAppResponse,
  E2eMessageType,
  INITIAL_PASSWORD_HASH
} from 'ui/background-script';
import { Runtime, runtime, scripting, storage } from 'webextension-polyfill';

import { DAppMessage } from './src/interfaces/dapp-message.interface';
import {
  openDAppConnectionConfirmationPopup,
  openNetworkChangeConfirmationPopup,
  openConfirmSendTransactionPopup
} from './src/utils/browser.utils';
import { getHexChanId } from './src/utils/network.utils';
import { getState } from './src/utils/state.utils';

const APP_LOCK_PERIOD = 5 * 60 * 1000;

let passwordHash = INITIAL_PASSWORD_HASH;
let lastUserActivityTimestamp = 0;

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
  const savedSessionTimeExpired = Date.now() > lastUserActivityTimestamp + APP_LOCK_PERIOD;

  if (isFullpagePort(port)) {
    isFullpageOpen = true;
  }

  if (savedSessionTimeExpired && !isFullpageOpen) {
    passwordHash = INITIAL_PASSWORD_HASH;
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
      const selectedRpcUrl = state.wallet.selectedNetworkRpcUrl;
      const selectedNetwork = state.wallet.networks.find(
        network => network.rpcUrl === state.wallet.selectedNetworkRpcUrl
      );
      const selectedNetworkChainId = selectedNetwork?.chainId ?? '1';
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

        case 'eth_estimateGas': {
          const result = '0x5208'; // 21000
          const message = createDAppResponse(id, result);

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'eth_blockNumber': {
          const result = '0x1610851';
          const message = createDAppResponse(id, result);

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'eth_sendTransaction': {
          await openConfirmSendTransactionPopup(id, data.params?.[0], dAppInfo);

          return Promise.resolve();
        }

        case 'eth_getTransactionByHash': {
          const provider = getDefaultProvider(selectedRpcUrl);
          const txReceipt = await provider.getTransaction(data.params?.[0]);

          const message = createDAppResponse(id, txReceipt);

          port.postMessage(message);

          return Promise.resolve();
        }

        default: {
          return Promise.reject();
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
      return Promise.resolve(passwordHash);
    }
    case E2eMessageType.ClearStorage: {
      return storage.local.clear();
    }
    default:
      // @ts-ignore
      return Promise.reject({ message: `Message with type ${message.type} rejected.` });
  }
});

const isFullpagePort = (port: Runtime.Port) =>
  port.sender?.url?.includes(`extension://${runtime.id}/fullpage.html`) ?? false;
