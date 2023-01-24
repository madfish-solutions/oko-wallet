import './shim.js';

import { getDefaultProvider } from 'ethers';
import { BackgroundMessage, BackgroundMessageType, createDAppResponse, E2eMessageType } from 'ui/background-script';
import { Runtime, runtime, scripting, storage } from 'webextension-polyfill';

import {
  LAST_USER_ACTIVITY_TIMESTAMP_KEY,
  LOCK_TIME_PERIOD_KEY,
  PASSWORD_HASH_KEY
} from './src/constants/storage-keys';
import { DAppMessage } from './src/interfaces/dapp-message.interface';
import { createDAppNotificationResponse, getHexChanId } from './src/utils/network.utils';
import { getSessionPasswordHash, setToStorage } from './src/utils/session.utils';
import { getState } from './src/utils/state.utils';
import {
  openConfirmSendTransactionPopup,
  openDAppConnectionConfirmationPopup,
  openNetworkChangeConfirmationPopup,
  openSignMessagePopup
} from './src/utils/windows.utils';

let isFullpageOpen = false;

scripting.registerContentScripts([
  {
    id: 'oko-inpage-script',
    matches: ['file://*/*', 'http://*/*', 'https://*/*'],
    js: ['scripts/inpage.js'],
    runAt: 'document_idle',
    // @ts-ignore
    world: 'MAIN'
  }
]);

runtime.onConnect.addListener(async port => {
  // check for time expired and max-view no opened then extension need to lock
  if (isFullpagePort(port)) {
    isFullpageOpen = true;
  }

  // listen when UI is closed
  if (port.name === 'klaytn_wallet_ui') {
    port.onDisconnect.addListener(internalPort => {
      // TODO: check if we could replace internalPort with port
      if (isFullpagePort(internalPort)) {
        isFullpageOpen = false;
      }

      return setToStorage({ [LAST_USER_ACTIVITY_TIMESTAMP_KEY]: Date.now() });
    });
  }

  const stateForLockTime = await getState();

  const lockTimePeriod = stateForLockTime.settings.lockTimePeriod;
  setToStorage({ [LOCK_TIME_PERIOD_KEY]: lockTimePeriod });

  let requestsToOpenPopup = 0;
  let responseStack: { id: string }[] = [];

  // listen content script messages
  port.onMessage.addListener(async (message: DAppMessage) => {
    const state = await getState();
    const data = message.data.data.data;

    if (message.data.target === 'oko-contentscript' && data !== undefined) {
      const id = data.id;
      const method = data.method;
      const dAppInfo = message.sender;

      const dAppState = state.dApps[dAppInfo.origin];
      const selectedRpcUrl = state.wallet.selectedNetworkRpcUrl;
      const selectedNetwork = state.wallet.networks.find(
        network => network.rpcUrl === state.wallet.selectedNetworkRpcUrl
      );
      const selectedNetworkChainId = selectedNetwork?.chainId ?? '1';
      const selectedAccountPublicKeyHash = state.wallet.selectedAccountPublicKeyHash;
      const isPermissionGranted = dAppState?.allowedAccounts.includes(selectedAccountPublicKeyHash);

      const provider = getDefaultProvider(selectedRpcUrl);

      runtime.onMessage.addListener(newMessage => {
        if (newMessage.type === 'STACK_CHECK') {
          if (responseStack.length > 0) {
            const result = [selectedAccountPublicKeyHash];
            responseStack.forEach(item => {
              const response = createDAppResponse(item.id, result);
              const notification = createDAppNotificationResponse('oko_accountsChanged', result);

              port.postMessage(response);
              port.postMessage(notification);
            });
            requestsToOpenPopup = 0;
            responseStack = [];
          }
        }

        return Promise.resolve();
      });

      switch (method) {
        case 'wallet_requestPermissions':
        case 'eth_requestAccounts': {
          if (requestsToOpenPopup > 0) {
            responseStack.push({ id });
          }
          if (isPermissionGranted) {
            const result = [selectedAccountPublicKeyHash];
            const response = createDAppResponse(id, result);
            const notification = createDAppNotificationResponse('oko_accountsChanged', result);

            port.postMessage(response);
            port.postMessage(notification);
          } else {
            if (requestsToOpenPopup === 0) {
              await openDAppConnectionConfirmationPopup(id, dAppInfo);
            }
            requestsToOpenPopup += 1;
          }

          return Promise.resolve();
        }
        case 'eth_accounts': {
          if (isPermissionGranted) {
            const result = [selectedAccountPublicKeyHash];
            const response = createDAppResponse(id, result);
            const notification = createDAppNotificationResponse('oko_accountsChanged', result);

            port.postMessage(response);
            port.postMessage(notification);
          } else {
            const response = createDAppResponse(id, []);

            port.postMessage(response);
          }

          return Promise.resolve();
        }
        case 'wallet_addEthereumChain':
        case 'wallet_switchEthereumChain': {
          if (data.params?.[0]?.chainId === getHexChanId(selectedNetworkChainId)) {
            const response = createDAppResponse(id, null);
            const params = { chainId: getHexChanId(selectedNetworkChainId), networkVersion: selectedNetworkChainId };
            const notification = createDAppNotificationResponse('oko_chainChanged', params);

            port.postMessage(response);
            port.postMessage(notification);
          } else {
            await openNetworkChangeConfirmationPopup(id, dAppInfo.origin, data.params?.[0]?.chainId);
          }

          return Promise.resolve();
        }
        case 'oko_getProviderState': {
          const result = {
            accounts: isPermissionGranted ? [selectedAccountPublicKeyHash] : [],
            chainId: getHexChanId(selectedNetworkChainId),
            isUnlocked: true,
            networkVersion: selectedNetworkChainId
          };
          const response = createDAppResponse(id, result);

          port.postMessage(response);

          return Promise.resolve();
        }
        case 'eth_chainId': {
          const result = getHexChanId(selectedNetworkChainId);
          const response = createDAppResponse(id, result);
          const params = { chainId: getHexChanId(selectedNetworkChainId), networkVersion: selectedNetworkChainId };
          const notification = createDAppNotificationResponse('oko_chainChanged', params);

          port.postMessage(response);
          port.postMessage(notification);

          return Promise.resolve();
        }
        case 'eth_gasPrice': {
          const result = await provider.getGasPrice();
          const response = createDAppResponse(id, result);

          port.postMessage(response);

          return Promise.resolve();
        }

        case 'eth_estimateGas': {
          if (data.params !== undefined) {
            const result = await provider.estimateGas(data.params[0].data);
            const response = createDAppResponse(id, result._hex);

            port.postMessage(response);
          }

          return Promise.resolve();
        }

        case 'eth_call': {
          if (data.params !== undefined) {
            const result = await provider.call({ to: data.params[0].to, data: data.params[0].data });
            const response = createDAppResponse(id, result);

            port.postMessage(response);
          }

          return Promise.resolve();
        }

        case 'eth_getBlockByNumber': {
          const result = await provider.getBlock(data.params?.[0]);
          const response = createDAppResponse(id, result);

          port.postMessage(response);

          return Promise.resolve();
        }

        case 'eth_blockNumber': {
          const result = await provider.getBlockNumber();
          const response = createDAppResponse(id, result.toString());

          port.postMessage(response);

          return Promise.resolve();
        }

        case 'eth_getBalance': {
          const result = await provider.getBalance(data.params?.[0], data.params?.[1] ?? 'latest');
          const response = createDAppResponse(id, result._hex);

          port.postMessage(response);

          return Promise.resolve();
        }

        case 'eth_sendTransaction': {
          await openConfirmSendTransactionPopup(id, data.params?.[0], dAppInfo);

          return Promise.resolve();
        }

        case 'eth_getTransactionByHash': {
          const txReceipt = await provider.getTransaction(data.params?.[0]);
          const response = createDAppResponse(id, txReceipt);

          port.postMessage(response);

          return Promise.resolve();
        }

        case 'eth_getTransactionReceipt': {
          const txReceipt = await provider.getTransactionReceipt(data.params?.[0]);
          const response = createDAppResponse(id, txReceipt);

          port.postMessage(response);

          return Promise.resolve();
        }

        case 'net_version': {
          const response = createDAppResponse(id, selectedNetworkChainId);

          port.postMessage(response);

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
    case BackgroundMessageType.GetPasswordHash: {
      return getSessionPasswordHash(isFullpageOpen);
    }
    case BackgroundMessageType.SetPasswordHash: {
      return setToStorage({ [PASSWORD_HASH_KEY]: message.data.passwordHash });
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
