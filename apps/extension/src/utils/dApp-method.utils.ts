import { getDefaultProvider } from 'ethers';
import { createDAppResponse } from 'ui/background-script';
import { Runtime } from 'webextension-polyfill';

import { DAppMessage } from '../interfaces/dapp-message.interface';

import { createDAppNotificationResponse, getHexChanId } from './network.utils';
import { getState } from './state.utils';
import { openPopup } from './windows.utils';

export const handleDAppMessage = async (message: DAppMessage, port: Runtime.Port) => {
  const state = await getState();
  const data = message.data.data.data;

  if (data !== undefined) {
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

    switch (method) {
      case 'wallet_requestPermissions':
      case 'eth_requestAccounts': {
        if (isPermissionGranted) {
          const result = [selectedAccountPublicKeyHash];
          const response = createDAppResponse(id, result);
          const notification = createDAppNotificationResponse('oko_accountsChanged', result);

          port.postMessage(response);
          port.postMessage(notification);
        } else {
          await openPopup({ id, dAppInfo: JSON.stringify(dAppInfo) }, port);
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
          await openPopup({ id, origin: dAppInfo.origin, requestedChainId: data.params?.[0]?.chainId }, port);
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
        await openPopup(
          { id, transactionInfo: JSON.stringify(data.params?.[0]), dAppInfo: JSON.stringify(dAppInfo) },
          port
        );

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
        await openPopup({ id, signInfo: JSON.stringify(data.params), dAppInfo: JSON.stringify(dAppInfo) }, port);

        return Promise.resolve();
      }

      default: {
        return Promise.reject();
      }
    }
  }
};
