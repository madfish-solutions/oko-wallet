import { useSelector } from 'react-redux';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountAddressSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';

import { WalletRootState, WalletState, TokenMetadata, AllAccountTokens } from './types';

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
      const accountAddressSlug = getAccountAddressSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      return (
        settings[accountAddressSlug]?.map(({ tokenAddress, isVisible, balance }) => {
          const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress);
          const { name, imageUrl } = tokensMetadata[tokenMetadataSlug];

          return {
            name,
            imageUrl,
            tokenAddress,
            isVisible,
            balance
          };
        }) ?? []
      );
    }
  );

export const useVisibleAccountTokensSelector = () => {
  return useSelector<WalletRootState, TokenMetadata[]>(
    ({ wallet: { tokensMetadata, settings, selectedAccountPublicKeyHash, selectedNetworkRpcUrl } }) => {
      const accountAddressSlug = getAccountAddressSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      return (
        settings[accountAddressSlug]
          ?.filter(({ isVisible }) => isVisible)
          ?.map(({ tokenAddress }) => tokensMetadata[getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress)]) ?? []
      );
    }
  );
};
