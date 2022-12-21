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
  openConfirmSendTransactionPopup,
  openSignMessagePopup
} from './src/utils/browser.utils';
import { createDAppNotificationResponse, getHexChanId } from './src/utils/network.utils';
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

      const provider = getDefaultProvider(selectedRpcUrl);

      switch (method) {
        case 'eth_requestAccounts': {
          if (isPermissionGranted) {
            const result = [selectedAccountPublicKeyHash];
            const message = createDAppResponse(id, result);
            const notification = createDAppNotificationResponse('oko_accountsChanged', result);

            port.postMessage(message);
            port.postMessage(notification);
          } else {
            await openDAppConnectionConfirmationPopup(id, dAppInfo);
          }

          return Promise.resolve();
        }
        case 'eth_accounts': {
          if (isPermissionGranted) {
            const result = [selectedAccountPublicKeyHash];
            const message = createDAppResponse(id, result);
            const notification = createDAppNotificationResponse('oko_accountsChanged', result);

            port.postMessage(message);
            port.postMessage(notification);
          } else {
            const message = createDAppResponse(id, []);
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
          const result = {
            accounts: isPermissionGranted ? [selectedAccountPublicKeyHash] : [],
            chainId: getHexChanId(selectedNetworkChainId),
            isUnlocked: true,
            networkVersion: selectedNetworkChainId
          };
          const message = createDAppResponse(id, result);

          port.postMessage(message);

          return Promise.resolve();
        }
        case 'eth_chainId': {
          const result = getHexChanId(selectedNetworkChainId);
          const message = createDAppResponse(id, result);
          const params = { chainId: getHexChanId(selectedNetworkChainId), networkVersion: selectedNetworkChainId };
          const notification = createDAppNotificationResponse('oko_chainChanged', params);

          port.postMessage(message);
          port.postMessage(notification);

          return Promise.resolve();
        }
        case 'eth_gasPrice': {
          const result = await provider.getGasPrice();
          const message = createDAppResponse(id, result);

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'eth_estimateGas': {
          if (data.params !== undefined) {
            const result = await provider.estimateGas(data.params[0].data);
            const message = createDAppResponse(id, result._hex);

            port.postMessage(message);
          }

          return Promise.resolve();
        }

        case 'eth_call': {
          if (data.params !== undefined) {
            const result = await provider.call({ to: data.params[0].to, data: data.params[0].data });
            const message = createDAppResponse(id, result);

            port.postMessage(message);
          }

          return Promise.resolve();
        }

        case 'eth_getBlockByNumber': {
          const result = await provider.getBlock(data.params?.[0]);
          const message = createDAppResponse(id, result);

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'eth_blockNumber': {
          const result = await provider.getBlockNumber();
          const message = createDAppResponse(id, result.toString());

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'eth_getBalance': {
          const result = await provider.getBalance(data.params?.[0], data.params?.[1] ?? 'latest');
          const message = createDAppResponse(id, result._hex);

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'eth_sendTransaction': {
          await openConfirmSendTransactionPopup(id, data.params?.[0], dAppInfo);

          return Promise.resolve();
        }

        case 'eth_getTransactionByHash': {
          const txReceipt = await provider.getTransaction(data.params?.[0]);

          const message = createDAppResponse(id, txReceipt);

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'eth_getTransactionReceipt': {
          const txReceipt = await provider.getTransactionReceipt(data.params?.[0]);

          const message = createDAppResponse(id, txReceipt);

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'net_version': {
          const message = createDAppResponse(id, selectedNetworkChainId);

          port.postMessage(message);

          return Promise.resolve();
        }

        case 'eth_sign':
        case 'personal_sign': {
          await openSignMessagePopup(id, data.params as string[], dAppInfo);

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
