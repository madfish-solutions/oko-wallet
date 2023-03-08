import { BaseProvider } from '@ethersproject/providers';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { getDefaultProvider } from 'ethers';
import { DAppMethodEnum } from 'shared/background-script';
import { createDAppResponse } from 'ui/background-script';
import { Runtime, runtime } from 'webextension-polyfill';

import { DAppMessage } from '../interfaces/dapp-message.interface';

import { createDAppNotificationResponse, getHexChanId } from './network.utils';
import { getState } from './state.utils';
import { unsafeRandomBytes } from './subscription.utils';
import { openPopup } from './windows.utils';

let subscriptionIds: string[] = [];
let providerSubscription: BaseProvider;

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
      case DAppMethodEnum.WALLET_REQUEST_PERMISSIONS:
      case DAppMethodEnum.ETH_REQUEST_ACCOUNTS: {
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
      case DAppMethodEnum.ETH_ACCOUNTS: {
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
      case DAppMethodEnum.WALLET_SWITCH_ETHEREUM_CHAIN:
      case DAppMethodEnum.WALLET_ADD_ETHEREUM_CHAIN: {
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
      case DAppMethodEnum.OKO_GET_PROVIDER_STATE: {
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
      case DAppMethodEnum.ETH_CHAIN_ID: {
        const result = getHexChanId(selectedNetworkChainId);
        const response = createDAppResponse(id, result);
        const params = { chainId: getHexChanId(selectedNetworkChainId), networkVersion: selectedNetworkChainId };
        const notification = createDAppNotificationResponse('oko_chainChanged', params);

        port.postMessage(response);
        port.postMessage(notification);

        return Promise.resolve();
      }
      case DAppMethodEnum.ETH_GAS_PRICE: {
        const result = await provider.getGasPrice();
        const response = createDAppResponse(id, result._hex);

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_ESTIMATE_GAS: {
        if (data.params !== undefined) {
          const result = await provider.estimateGas(data.params[0]);
          const response = createDAppResponse(id, result._hex);

          port.postMessage(response);
        }

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_CALL: {
        if (data.params !== undefined) {
          const result = await provider.call({ to: data.params[0].to, data: data.params[0].data });
          const response = createDAppResponse(id, result);

          port.postMessage(response);
        }

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_GET_BLOCK_BY_NUMBER: {
        const result = await provider.getBlock(data.params?.[0]);
        const modifiedResult = { ...result, baseFeePerGas: result.baseFeePerGas?._hex };
        const response = createDAppResponse(id, modifiedResult);

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_BLOCK_NUMBER: {
        const result = await provider.getBlockNumber();
        const response = createDAppResponse(id, result.toString());

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_GET_BALANCE: {
        const result = await provider.getBalance(data.params?.[0], data.params?.[1] ?? 'latest');
        const response = createDAppResponse(id, result._hex);

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_SEND_TRANSACTION: {
        await openPopup(
          { id, transactionInfo: JSON.stringify(data.params?.[0]), dAppInfo: JSON.stringify(dAppInfo) },
          port
        );

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_GET_TRANSACTION_BY_HASH: {
        const txReceipt = await provider.getTransaction(data.params?.[0]);
        const response = createDAppResponse(id, txReceipt);

        port.postMessage(response);

        return Promise.resolve(response);
      }

      case DAppMethodEnum.ETH_GET_TRANSACTION_RECEIPT: {
        const result = await provider.getTransactionReceipt(data.params?.[0]);
        if (result !== null) {
          const modifiedResult = {
            ...result,
            cumulativeGasUsed: result.cumulativeGasUsed._hex,
            effectiveGasPrice: result.effectiveGasPrice._hex,
            gasUsed: result.gasUsed._hex
          };
          const response = createDAppResponse(id, modifiedResult);
          port.postMessage(response);

          return Promise.resolve();
        }

        const response = createDAppResponse(id, result);
        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_GET_TRANSACTION_COUNT: {
        const txCount = await provider.getTransactionCount(data.params?.[0], data.params?.[1]);
        const response = createDAppResponse(id, txCount);

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.NET_VERSION: {
        const response = createDAppResponse(id, selectedNetworkChainId);

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_SIGN:
      case DAppMethodEnum.ETH_PERSONAL_SIGN:
      case DAppMethodEnum.ETH_SIGN_TYPED_DATA:
      case DAppMethodEnum.ETH_SIGN_TYPED_DATA_V3:
      case DAppMethodEnum.ETH_SIGN_TYPED_DATA_V4: {
        await openPopup(
          { id, signInfo: JSON.stringify(data.params), dAppInfo: JSON.stringify(dAppInfo), method },
          port
        );

        return Promise.resolve();
      }

      case DAppMethodEnum.WEB3_CLIENT_VERSION: {
        const version = 'v' + runtime.getManifest().version;
        const response = createDAppResponse(id, 'Oko/' + version);

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.WALLET_GET_PERMISSIONS: {
        const caveats = [{ type: 'restrictReturnedAccounts', value: dAppState.allowedAccounts }];
        const result = [
          {
            parentCapability: DAppMethodEnum.ETH_ACCOUNTS,
            invoker: dAppInfo.origin,
            caveats,
            date: Date.now()
          }
        ];

        const response = createDAppResponse(id, result);

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.PERSONAL_EC_RECOVER: {
        const result = recoverPersonalSignature({ data: data?.params?.[0], signature: data?.params?.[1] });
        const response = createDAppResponse(id, result);

        port.postMessage(response);

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_SUBSCRIBE: {
        const newSubscriptionId = unsafeRandomBytes(16);
        subscriptionIds.push(newSubscriptionId);
        const subscription = createDAppResponse(id, newSubscriptionId);

        port.postMessage(subscription);

        providerSubscription = provider.on('block', async blockNumber => {
          const result = await provider.getBlock(blockNumber);
          const modifiedResult = {
            ...result,
            baseFeePerGas: result.baseFeePerGas?._hex,
            gasLimit: result.gasLimit._hex,
            gasUsed: result.gasUsed._hex
          };
          const response = createDAppNotificationResponse(DAppMethodEnum.ETH_SUBSCRIPTION, {
            subscription: newSubscriptionId,
            result: modifiedResult
          });
          port.postMessage(response);
        });

        return Promise.resolve();
      }

      case DAppMethodEnum.ETH_UNSUBSCRIBE: {
        if (subscriptionIds.includes(data.params?.[0])) {
          providerSubscription.off('block');
          subscriptionIds = subscriptionIds.filter(subscriptionId => subscriptionId !== data.params?.[0]);

          const response = createDAppResponse(id, true);
          setTimeout(() => port.postMessage(response), 1000);
        }

        return Promise.resolve();
      }

      default: {
        return Promise.reject();
      }
    }
  }
};
