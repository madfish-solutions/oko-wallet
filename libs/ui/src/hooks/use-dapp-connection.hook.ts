import { parse } from 'query-string';
import { useEffect } from 'react';
import { browser } from 'webextension-polyfill-ts';

import { globalNavigationRef } from '../components/navigator/navigator';
import { ScreensEnum } from '../enums/sreens.enum';
import { useSelectedAccountPublicKeyHashSelector, useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';
import { isWeb } from '../utils/platform.utils';

const prepareResponse = (result: unknown, id: number, method: string) => ({
  data: {
    data: { id, jsonrpc: '2.0', method, result },
    name: 'metamask-provider'
  },
  target: 'metamask-inpage'
});

export const useDappConnection = () => {
  useEffect(() => {
    if (isWeb) {
      const query = parse(location.search);
      if (
        Boolean(query?.confirmation) === true &&
        typeof query.origin === 'string' &&
        typeof query.id === 'string' &&
        globalNavigationRef.current !== null
      ) {
        globalNavigationRef.current.navigate(ScreensEnum.DappConfirmation, {
          dappName: query.origin,
          id: query.id
        });
      }
    }
  }, [globalNavigationRef.current]);
};

export const useDappMessenger = () => {
  //const selectedAccount = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const channel = new BroadcastChannel('Klaytn_Background');

  window.addEventListener('DOMContentLoaded', () => {
    channel.postMessage({ msg: 'background' });

    channel.onmessage = msg => {
      const ethRequest = msg.data?.data?.findLast((rpcData: any) => rpcData?.data?.data?.method === 'eth_chainId');
      if (ethRequest !== undefined) {
        browser.tabs.query({ active: true }).then(tabs => {
          if (tabs[0].id !== undefined) {
            browser.tabs.sendMessage(tabs[0].id, prepareResponse(chainId, ethRequest.data.data.id, 'eth_chainId'));
          }
        });
      }
    };
  });
};
