import { useSelector } from 'react-redux';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { initialAccount } from '../../mocks/account.interface.mock';

import { WalletRootState, WalletState, TokenMetadata } from './types';

export const useSelectedAccountSelector = () =>
  useSelector<WalletRootState, AccountInterface>(
    ({ wallet }) =>
      wallet.accounts.find(account => account.publicKeyHash === wallet.selectedAccountPublicKeyHash) ?? initialAccount,
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

export const useSelectedNetworkSelector = () =>
  useSelector<WalletRootState, NetworkInterface>(
    ({ wallet }) =>
      wallet.networks.find(network => network.rpcUrl === wallet.selectedNetworkRpcUrl) ?? NETWORKS_DEFAULT_LIST[0],
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

export const useAllNetworksSelector = () =>
  useSelector<WalletRootState, WalletState['networks']>(({ wallet }) => wallet.networks);

export const useAllAccountTokens = () =>
  useSelector<WalletRootState, { tokenAddress: string; isVisible: boolean; url?: string; name: string }[]>(
    ({ wallet: { settings, selectedAccountPublicKeyHash, tokensMetadata, selectedNetworkRpcUrl } }) =>
      settings[selectedNetworkRpcUrl]?.[selectedAccountPublicKeyHash]?.map(({ tokenAddress, isVisible }) => {
        const { name, url } = tokensMetadata[selectedNetworkRpcUrl][tokenAddress];

        return {
          name,
          url,
          tokenAddress,
          isVisible
        };
      }) ?? []
  );

export const useVisibleAccountTokens = () => {
  return useSelector<WalletRootState, TokenMetadata[]>(
    ({ wallet: { tokensMetadata, settings, selectedAccountPublicKeyHash, selectedNetworkRpcUrl } }) =>
      settings[selectedNetworkRpcUrl]?.[selectedAccountPublicKeyHash]
        ?.filter(({ isVisible }) => isVisible)
        ?.map(({ tokenAddress }) => tokensMetadata[selectedNetworkRpcUrl][tokenAddress]) ?? []
  );
};
