import { useSelector } from 'react-redux';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { initialAccount } from '../../mocks/account.interface.mock';

import { WalletRootState, WalletState, TokenMetadata, AllAccountTokens } from './types';
import { getAccountTokenSlug } from './utils/get-account-token-slug';
import { getMetadataSlug } from './utils/get-metadata-slug';

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

export const useAllAccountTokensSelector = () =>
  useSelector<WalletRootState, AllAccountTokens[]>(
    ({ wallet: { settings, selectedAccountPublicKeyHash, tokensMetadata, selectedNetworkRpcUrl } }) => {
      const accountTokenSlug = getAccountTokenSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      return (
        settings[accountTokenSlug]?.map(({ tokenAddress, isVisible }) => {
          const metadataSlug = getMetadataSlug(selectedNetworkRpcUrl, tokenAddress);
          const { name, imageUrl } = tokensMetadata[metadataSlug];

          return {
            name,
            imageUrl,
            tokenAddress,
            isVisible
          };
        }) ?? []
      );
    }
  );

export const useVisibleAccountTokensSelector = () => {
  return useSelector<WalletRootState, TokenMetadata[]>(
    ({ wallet: { tokensMetadata, settings, selectedAccountPublicKeyHash, selectedNetworkRpcUrl } }) => {
      const accountTokenSlug = getAccountTokenSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      return (
        settings[accountTokenSlug]
          ?.filter(({ isVisible }) => isVisible)
          ?.map(({ tokenAddress }) => tokensMetadata[getMetadataSlug(selectedNetworkRpcUrl, tokenAddress)]) ?? []
      );
    }
  );
};
