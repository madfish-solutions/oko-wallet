import { isDefined } from '@rnw-community/shared';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { TransactionStatusEnum } from '../../enums/transactions.enum';
import { AccountInterface, Transaction } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { getTokenSlug, isCollectible } from '../../utils/token.utils';
import { checkEquality } from '../utils/check-equality.util';

import { WalletRootState, WalletState } from './wallet.state';
import { getPublicKeyHash, getSelectedNetworkType } from './wallet.utils';

export const useSelectedAccountPublicKeyHashSelector = () =>
  useSelector<WalletRootState, string>(({ wallet }) => wallet.selectedAccountPublicKeyHash);

export const useSelectedNetworkSelector = () =>
  useSelector<WalletRootState, NetworkInterface>(
    ({ wallet }) =>
      wallet.networks.find(network => network.rpcUrl === wallet.selectedNetworkRpcUrl) ?? NETWORKS_DEFAULT_LIST[0],
    checkEquality
  );

export const useAllNetworksSelector = () =>
  useSelector<WalletRootState, WalletState['networks']>(({ wallet }) => wallet.networks);

export const useSelectedNetworkTypeSelector = () =>
  useSelector<WalletRootState, NetworkTypeEnum>(({ wallet }) => getSelectedNetworkType(wallet));

export const useSelectedAccountSelector = () =>
  useSelector<WalletRootState, AccountInterface>(({ wallet }) => {
    const { accounts, selectedAccountPublicKeyHash } = wallet;

    const selectedNetworkType = getSelectedNetworkType(wallet);
    const selectedAccount =
      accounts.find(account => {
        const isExist = account.networksKeys.hasOwnProperty(selectedNetworkType);

        return isExist ? getPublicKeyHash(account, selectedNetworkType) === selectedAccountPublicKeyHash : null;
      }) ?? initialAccount;

    return selectedAccount;
  }, checkEquality);

export const useSelectedAccountPkhSelector = () =>
  useSelector<WalletRootState, string>(({ wallet }) => wallet.selectedAccountPublicKeyHash);

export const useAllAccountsSelector = () =>
  useSelector<WalletRootState, WalletState['accounts']>(({ wallet }) => wallet.accounts);

export const useAllAccountsNameSelector = () => {
  const accounts = useAllAccountsSelector();

  return useMemo(() => accounts.map(({ name }) => name.toLowerCase()), [accounts]);
};

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
            ...tokensMetadata[tokenMetadataSlug],
            ...accountToken
          };
        }) ?? []
      );
    },
    checkEquality
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

export const useCollectiblesWidgetSelector = () => {
  const WIDGET_VISIBLE_COLLECTIBLES = 2;
  const collectibles = useCollectiblesSelector();

  return useMemo(() => collectibles.slice(0, WIDGET_VISIBLE_COLLECTIBLES), [collectibles]);
};

export const useIsAuthorisedSelector = () => {
  const accounts = useSelector<WalletRootState, AccountInterface[]>(({ wallet }) => wallet.accounts);

  return useMemo(() => accounts.length > 0, [accounts.length]);
};

export const usePendingTransactionsSelector = () => {
  const transactions = useSelector<WalletRootState, Record<string, Transaction[]>>(({ wallet }) => wallet.transactions);
  const selectedAccountPublicKeyHash = useSelectedAccountPkhSelector();
  const selectedNetworkRpcUrl = useSelector<WalletRootState, string>(({ wallet }) => wallet.selectedNetworkRpcUrl);

  const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

  return useMemo(
    () =>
      isDefined(transactions[accountTokensSlug])
        ? transactions[accountTokensSlug].filter(tx => tx.status === TransactionStatusEnum.pending)
        : [],
    [transactions, selectedNetworkRpcUrl, selectedAccountPublicKeyHash]
  );
};

export const useMintedTransactionsSelector = () => {
  const transactions = useSelector<WalletRootState, Record<string, Transaction[]>>(({ wallet }) => wallet.transactions);

  const selectedAccountPublicKeyHash = useSelectedAccountPkhSelector();
  const selectedNetworkRpcUrl = useSelector<WalletRootState, string>(({ wallet }) => wallet.selectedNetworkRpcUrl);

  const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

  return useMemo(
    () =>
      isDefined(transactions[accountTokensSlug])
        ? transactions[accountTokensSlug].filter(tx => tx.status === TransactionStatusEnum.applied)
        : [],
    [transactions, selectedNetworkRpcUrl, selectedAccountPublicKeyHash]
  );
};

export const useTokenBalanceFromStore = (tokenSlug: string): string => {
  const network = useSelectedNetworkSelector();
  const accountTokens = useAccountTokensSelector();

  let tokenBalance = '0';

  if (tokenSlug === 'gas_token_0') {
    tokenBalance = network.gasTokenBalance.data;
  } else {
    tokenBalance =
      accountTokens.find(token => getTokenSlug(token.tokenAddress, token.tokenId) === tokenSlug)?.balance.data ?? '0';
  }

  return useMemo(() => tokenBalance, [tokenBalance]);
};
