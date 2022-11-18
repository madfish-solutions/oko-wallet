import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TokenMetadata } from 'src/interfaces/token-metadata.interface';

import { GAS_TOKEN_ADDRESS } from '../../constants/defaults';
import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { AccountTypeEnum } from '../../enums/account-type.enum';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getAllAccountsWithoutCurrent } from '../../utils/get-all-accounts-without-current.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { getTokenSlug, isCollectible } from '../../utils/token.utils';
import { LoadableEntityState } from '../interfaces/loadable-entity-state.interface';
import { checkEquality } from '../utils/check-equality.util';

import { WalletRootState, WalletState } from './wallet.state';
import { getPublicKeyHash, getSelectedNetworkType } from './wallet.utils';

export const useSelectedAccountPublicKeyHashSelector = () =>
  useSelector<WalletRootState, string>(({ wallet }) => wallet.selectedAccountPublicKeyHash);

export const useSelectedNetworkSelector = () =>
  useSelector<WalletRootState, NetworkInterface>(
    ({ wallet }) =>
      wallet.networks.find(network => network.chainId === wallet.selectedNetworkChainId) ?? NETWORKS_DEFAULT_LIST[0],
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

export const useAllVisibleAccountsSelector = () => {
  const accounts = useAllAccountsSelector();

  return useMemo(() => accounts.filter(account => account.isVisible), [accounts]);
};

export const useAllAccountsWithoutSelectedSelector = () => {
  const allAccounts = useAllVisibleAccountsSelector();
  const selectedAccount = useSelectedAccountSelector();

  return useMemo(() => getAllAccountsWithoutCurrent(allAccounts, selectedAccount), [allAccounts, selectedAccount]);
};

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
    ({ wallet: { accountsTokens, selectedAccountPublicKeyHash, tokensMetadata, selectedNetworkChainId } }) => {
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkChainId, selectedAccountPublicKeyHash);

      return (
        accountsTokens[accountTokensSlug]?.map(accountToken => {
          const tokenMetadataSlug = getTokenMetadataSlug(
            selectedNetworkChainId,
            accountToken.tokenAddress,
            accountToken.tokenId
          );

          return {
            ...accountToken,
            ...tokensMetadata[tokenMetadataSlug]
          };
        }) ?? []
      );
    },
    checkEquality
  );

export const useGasTokenSelector = () => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const accountsGasTokens = useAccountsGasTokensSelector();
  const { gasTokenMetadata, rpcUrl, chainId } = useSelectedNetworkSelector();
  const accountGasTokenSlug = getAccountTokensSlug(chainId, publicKeyHash);

  return useMemo(
    () => ({
      ...gasTokenMetadata,
      balance: accountsGasTokens[accountGasTokenSlug] ?? 0,
      tokenAddress: GAS_TOKEN_ADDRESS,
      isVisible: true
    }),
    [rpcUrl, accountsGasTokens, accountGasTokenSlug]
  );
};

export const useAccountTokensSelector = () => {
  const assets = useAccountAssetsSelector();

  return useMemo(() => assets.filter(token => !isCollectible(token)), [assets]);
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

export const useTokenBalanceSelector = (tokenSlug: string): string => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const accountTokens = useAccountTokensSelector();
  const accountsGasTokens = useAccountsGasTokensSelector();
  const accountGasTokenSlug = getAccountTokensSlug(network.chainId, publicKeyHash);

  const tokenBalance =
    tokenSlug === getTokenSlug(GAS_TOKEN_ADDRESS)
      ? accountsGasTokens[accountGasTokenSlug]?.data
      : accountTokens.find(token => getTokenSlug(token.tokenAddress, token.tokenId) === tokenSlug)?.balance.data ?? '0';

  return useMemo(() => tokenBalance, [tokenBalance]);
};

export const useAllSavedTokensSelector = () => {
  const tokensMetadata = useSelector<WalletRootState, Record<string, TokenMetadata>>(
    ({ wallet }) => wallet.tokensMetadata
  );

  const allTokens = Object.entries(tokensMetadata);

  const getTokenAddress = (metadataSlug: string) => metadataSlug.split('_')[1];

  allTokens.map(token => {
    token[0] = getTokenAddress(token[0]);

    return token;
  });

  return allTokens;
};
