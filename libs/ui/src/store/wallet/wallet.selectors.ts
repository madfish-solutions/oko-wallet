import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { isCollectible } from '../../utils/token.utils';

import { WalletRootState, WalletState } from './wallet.state';
import { getPublicKeyHash, getSelectedNetworkType } from './wallet.utils';

export const useSelectedAccountPublicKeyHashSelector = () =>
  useSelector<WalletRootState, string>(({ wallet }) => wallet.selectedAccountPublicKeyHash);

export const useSelectedNetworkSelector = () =>
  useSelector<WalletRootState, NetworkInterface>(
    ({ wallet }) =>
      wallet.networks.find(network => network.rpcUrl === wallet.selectedNetworkRpcUrl) ?? NETWORKS_DEFAULT_LIST[0],
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

export const useAllNetworksSelector = () =>
  useSelector<WalletRootState, WalletState['networks']>(({ wallet }) => wallet.networks);

export const useSelectedNetworkTypeSelector = () =>
  useSelector<WalletRootState, NetworkTypeEnum>(({ wallet }) => getSelectedNetworkType(wallet));

export const useSelectedAccountSelector = () =>
  useSelector<WalletRootState, AccountInterface>(
    ({ wallet }) => {
      const { accounts, selectedAccountPublicKeyHash } = wallet;

      const selectedNetworkType = getSelectedNetworkType(wallet);
      const selectedAccount =
        accounts.find(account => {
          const isExist = account.networksKeys.hasOwnProperty(selectedNetworkType);

          return isExist ? getPublicKeyHash(account, selectedNetworkType) === selectedAccountPublicKeyHash : null;
        }) ?? initialAccount;

      return selectedAccount;
    },
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

export const useSelectedAccountPkhSelector = () =>
  useSelector<WalletRootState, string>(({ wallet }) => wallet.selectedAccountPublicKeyHash);

export const useAllAccountsSelector = () =>
  useSelector<WalletRootState, WalletState['accounts']>(({ wallet }) => wallet.accounts);

export const useAccountAssetsSelector = () =>
  useSelector<WalletRootState, Token[]>(
    ({ wallet: { accountsTokens, selectedAccountPublicKeyHash, tokensMetadata, selectedNetworkRpcUrl } }) => {
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      return (
        accountsTokens[accountTokensSlug]?.map(accountToken => {
          const tokenMetadataSlug = getTokenMetadataSlug(
            selectedNetworkRpcUrl,
            accountToken.tokenAddress,
            accountToken.tokenId
          );

          return {
            ...accountToken,
            ...tokensMetadata[tokenMetadataSlug]
          };
        }) ?? []
      );
    }
  );

export const useAccountTokensSelector = () => {
  const assets = useAccountAssetsSelector();

  return useMemo(() => assets.filter(token => !isCollectible(token)), [assets]);
};

export const useVisibleAccountTokensSelector = () => {
  const accountTokens = useAccountTokensSelector();

  return useMemo(() => accountTokens.filter(({ isVisible }) => isVisible), [accountTokens]);
};

export const useCollectiblesSelector = () => {
  const assets = useAccountAssetsSelector();

  return useMemo(() => assets.filter(token => isCollectible(token)), [assets]);
};

export const useIsAuthorisedSelector = () => {
  const accounts = useSelector<WalletRootState, AccountInterface[]>(({ wallet }) => wallet.accounts);

  return useMemo(() => accounts.length > 0, [accounts.length]);
};
