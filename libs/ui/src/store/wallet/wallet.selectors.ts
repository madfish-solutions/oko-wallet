import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AccountTypeEnum, NetworkTypeEnum, AccountInterface } from 'shared';

import { EMPTY_ACCOUNT, EMPTY_TOKEN, GAS_TOKEN_ADDRESS } from '../../constants/defaults';
import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { TransactionStatusEnum } from '../../enums/transactions.enum';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getAllAccountsWithoutCurrent } from '../../utils/get-all-accounts-without-current.util';
import { getDollarValue } from '../../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { getTokenSlug, isCollectible } from '../../utils/token.utils';
import { LoadableEntityState } from '../interfaces/loadable-entity-state.interface';
import { useTokensMarketInfoSelector } from '../tokens-market-info/token-market-info.selectors';
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

export const useAccountsGasTokensSelector = () =>
  useSelector<WalletRootState, Record<string, LoadableEntityState<string>>>(({ wallet }) => wallet.accountsGasTokens);

export const useSelectedAccountSelector = () =>
  useSelector<WalletRootState, AccountInterface>(({ wallet }) => {
    const { accounts, selectedAccountPublicKeyHash } = wallet;

    const selectedNetworkType = getSelectedNetworkType(wallet);

    return (
      accounts.find(account => {
        const isExist = account.networksKeys.hasOwnProperty(selectedNetworkType);

        return isExist ? getPublicKeyHash(account, selectedNetworkType) === selectedAccountPublicKeyHash : null;
      }) ?? initialAccount
    );
  }, checkEquality);

export const useAllAccountsSelector = () =>
  useSelector<WalletRootState, WalletState['accounts']>(({ wallet }) => wallet.accounts);

export const useAllHdAccountsSelector = () => {
  const accounts = useAllAccountsSelector();

  return useMemo(() => accounts.filter(({ type }) => type === AccountTypeEnum.HD_ACCOUNT), [accounts]);
};

export const useUserAccountSelector = (publicKeyHash: string) => {
  const accounts = useAllAccountsSelector();
  const networkType = useSelectedNetworkTypeSelector();

  return useMemo(
    () => accounts.find(account => account.networksKeys[networkType]?.publicKeyHash === publicKeyHash) ?? EMPTY_ACCOUNT,
    [accounts]
  );
};

export const useAllVisibleAccountsSelector = () => {
  const accounts = useAllAccountsSelector();

  return useMemo(() => accounts.filter(account => account.isVisible), [accounts]);
};

export const useAllAccountsWithoutSelectedSelector = () => {
  const allAccounts = useAllVisibleAccountsSelector();
  const selectedAccount = useSelectedAccountSelector();

  return useMemo(() => getAllAccountsWithoutCurrent(allAccounts, selectedAccount), [allAccounts, selectedAccount]);
};

export const useTokensMetadataSelector = () =>
  useSelector<WalletRootState, WalletState['tokensMetadata']>(({ wallet }) => wallet.tokensMetadata);

export const useAllAccountsTokensAndTokensMetadataSelector = () =>
  useSelector<
    WalletRootState,
    { accountsTokens: WalletState['accountsTokens']; tokensMetadata: WalletState['tokensMetadata'] }
  >(({ wallet: { accountsTokens, tokensMetadata } }) => ({
    accountsTokens,
    tokensMetadata
  }));

export const useAccountAssetsSelector = () =>
  useSelector<WalletRootState, Token[]>(
    ({ wallet: { accountsTokens, selectedAccountPublicKeyHash, tokensMetadata, selectedNetworkRpcUrl, networks } }) => {
      const chainId =
        networks.find(network => network.rpcUrl === selectedNetworkRpcUrl)?.chainId ?? NETWORKS_DEFAULT_LIST[0].chainId;
      const accountTokensSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);

      return (
        accountsTokens[accountTokensSlug]?.map(accountToken => {
          const tokenMetadataSlug = getTokenMetadataSlug(chainId, accountToken.tokenAddress, accountToken.tokenId);

          return {
            ...accountToken,
            ...tokensMetadata[tokenMetadataSlug]
          };
        }) ?? []
      );
    },
    checkEquality
  );

export const useGasTokenSelector = (): Token => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const accountsGasTokens = useAccountsGasTokensSelector();
  const { gasTokenMetadata, chainId } = useSelectedNetworkSelector();
  const accountGasTokenSlug = getAccountTokensSlug(chainId, publicKeyHash);
  const tokenMetadataSlug = getTokenMetadataSlug(chainId, GAS_TOKEN_ADDRESS);
  const allTokensMarketInfo = useTokensMarketInfoSelector();

  const fiatBalance = Number(
    getDollarValue({
      amount: isDefined(accountsGasTokens[accountGasTokenSlug]) ? accountsGasTokens[accountGasTokenSlug].data : '0',
      price: isDefined(allTokensMarketInfo[tokenMetadataSlug]) ? allTokensMarketInfo[tokenMetadataSlug].price : 0,
      decimals: gasTokenMetadata.decimals,
      toFixed: false
    })
  );

  return useMemo(
    () => ({
      ...gasTokenMetadata,
      balance: accountsGasTokens[accountGasTokenSlug] ?? 0,
      tokenAddress: GAS_TOKEN_ADDRESS,
      isVisible: true,
      fiatBalance
    }),
    [chainId, accountsGasTokens, accountGasTokenSlug, fiatBalance]
  );
};

export const useAccountTokensSelector = (): Token[] => {
  const assets = useAccountAssetsSelector();
  const allTokensMarketInfo = useTokensMarketInfoSelector();
  const { chainId } = useSelectedNetworkSelector();

  return useMemo(
    () =>
      assets
        .filter(token => !isCollectible(token))
        .map(token => {
          const tokenMetadataSlug = getTokenMetadataSlug(chainId, token.tokenAddress);

          const fiatBalance = Number(
            getDollarValue({
              amount: token.balance?.data ?? '0',
              price: isDefined(allTokensMarketInfo[tokenMetadataSlug])
                ? allTokensMarketInfo[tokenMetadataSlug].price
                : 0,
              decimals: token.decimals,
              toFixed: false
            })
          );

          return { ...token, fiatBalance };
        }),
    [assets, allTokensMarketInfo, chainId]
  );
};

export const useVisibleAccountTokensSelector = () => {
  const accountTokens = useAccountTokensSelector();

  return useMemo(() => accountTokens.filter(({ isVisible }) => isVisible), [accountTokens]);
};

export const useAccountTokensAndGasTokenSelector = (): Token[] => {
  const allAccountTokens = useAccountTokensSelector();
  const gasToken = useGasTokenSelector();

  return useMemo(() => [gasToken, ...allAccountTokens], [allAccountTokens, gasToken]);
};

export const useCurrentTokenSelector = (tokenAddress: string, tokenId?: string) => {
  const tokens = useAccountTokensAndGasTokenSelector();

  return useMemo(
    () =>
      tokens.find(token => getTokenSlug(token.tokenAddress, token.tokenId) === getTokenSlug(tokenAddress, tokenId)) ??
      EMPTY_TOKEN,
    [tokens]
  );
};

export const useVisibleAccountTokensAndGasTokenSelector = (): Token[] => {
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const gasToken = useGasTokenSelector();

  return useMemo(() => [gasToken, ...visibleAccountTokens], [visibleAccountTokens, gasToken]);
};

export const useCollectiblesSelector = () => {
  const assets = useAccountAssetsSelector();

  return useMemo(() => assets.filter(token => isCollectible(token)), [assets]);
};

export const useSelectedCollectionSelector = (contractName: string) => {
  const collectibles = useCollectiblesSelector();

  return useMemo(() => collectibles.filter(collectible => collectible.contractName === contractName), [collectibles]);
};

export const useSelectedCollectibleSelector = (collectibleSlug: string) => {
  const collectibles = useCollectiblesSelector();

  return useMemo(
    () =>
      collectibles.find(collectible => getTokenSlug(collectible.tokenAddress, collectible.tokenId) === collectibleSlug),
    [collectibles]
  );
};

export const useIsAuthorisedSelector = () => {
  const accounts = useSelector<WalletRootState, AccountInterface[]>(({ wallet }) => wallet.accounts);

  return useMemo(() => accounts.length > 0, [accounts.length]);
};

const usePendingTransactionsSelector = () => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();
  const accountTokensSlug = getAccountTokensSlug(chainId, publicKeyHash);
  const transactions = useSelector<WalletRootState, WalletState['transactions']>(({ wallet }) => wallet.transactions);

  return useMemo(
    () =>
      isDefined(transactions[accountTokensSlug])
        ? transactions[accountTokensSlug].filter(({ status }) => status === TransactionStatusEnum.pending)
        : [],
    [transactions, accountTokensSlug]
  );
};

export const usePendingCollectiblesTransactionsSelector = () => {
  const pendingTransactions = usePendingTransactionsSelector();

  return useMemo(
    () =>
      pendingTransactions.filter(
        ({ token: { tokenAddress, tokenId } }) => isNotEmptyString(tokenAddress) && isNotEmptyString(tokenId)
      ),
    [pendingTransactions]
  );
};

export const useIsPendingCollectibleTransaction = (tokenAddress: string, tokenId = '') => {
  const pendingCollectiblesTransactions = usePendingCollectiblesTransactionsSelector();

  return useMemo(
    () =>
      isDefined(
        pendingCollectiblesTransactions.find(
          ({ token }) => tokenAddress === token.tokenAddress && tokenId === token.tokenId
        )
      ),
    [pendingCollectiblesTransactions]
  );
};
